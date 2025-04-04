from .models import Product, PriceHistory, PriceAlert
import requests

#for testing sendgrid email
import logging
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
#for testing sendgrid email

KROGER_CLIENT_ID = "grocerygauge-243261243034242f6863354a64535762396c68434f74357059664b714f58515633327a2f4a734c657243516864345865724a79396462476c444676759164103456257333400"
KROGER_CLIENT_SECRET = "dfumzU6kRGFuQnUzyskG89AEW1biXGKScXPVO8fs"

def get_kroger_access_token():
    url = "https://api.kroger.com/v1/connect/oauth2/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "client_id": KROGER_CLIENT_ID,
        "client_secret": KROGER_CLIENT_SECRET,
        "scope": "product.compact"
    }
    response = requests.post(url, headers=headers, data=data)
    return response.json().get("access_token")

def search_kroger_products(keyword, location_id="01400943"):
    """Search for products using a keyword."""
    access_token = get_kroger_access_token()
    url = "https://api.kroger.com/v1/products"
    headers = {"Authorization": f"Bearer {access_token}"}
    
    params = {
        "filter.term": keyword,
        "filter.locationId": location_id,
        "limit": 2
    }
    
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    
    data = response.json()  # This is the full Kroger response
    product_list = data.get("data", [])  # An array of product objects

    for item in product_list:
        product_id = item["productId"]
        name = item.get("description", "No Name")
        brand = item.get("brand", "")
        upc = item.get("upc")
        # "items" array often holds pricing info
        # Example: item["items"][0]["price"]["regular"]
        price_info = item["items"][0].get("price", {})
        current_price = price_info.get("regular", 0.0)
        
        # Save to DB (create or update existing product)
        product, created = Product.objects.update_or_create(
            product_id=product_id,
            defaults={
                "name": name,
                "brand": brand,
                "upc": upc,
                "current_price": current_price
            }
        )
        # Optionally, you can add a separate model for PriceHistory here
        PriceHistory.objects.create(product=product, price=current_price)

    return data  # Or return something if you still want the raw data


#for testing sendgrid email

logger = logging.getLogger(__name__)

def test_sendgrid():
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails="yinglin.jiang25@gmail.com",
        subject="SendGrid Test",
        html_content="<p>This is a test email from SendGrid!</p>",
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        logger.info(f"SendGrid response status: {response.status_code}")
        return response.status_code
    except Exception as e:
        logger.error(f"SendGrid error: {e}")
        raise