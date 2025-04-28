from .models import Product, PriceHistory, PriceAlert
import requests
from celery import shared_task
#for testing sendgrid email
import logging
from requests.auth import HTTPBasicAuth
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.utils import timezone
import logging
import requests
from json.decoder import JSONDecodeError
from django.conf import settings
#for testing sendgrid email

# KROGER_CLIENT_ID = "grocerygauge-243261243034242f6863354a64535762396c68434f74357059664b714f58515633327a2f4a734c657243516864345865724a79396462476c444676759164103456257333400"
# KROGER_CLIENT_SECRET = "rbR2riiPjlrpFfrRglgpk8qfu0FlJKmDEmxLkpwd"

logger = logging.getLogger(__name__)

def get_kroger_access_token():
    client_id     = settings.KROGER_CLIENT_ID
    client_secret = settings.KROGER_CLIENT_SECRET
    if not client_id or not client_secret:
        raise RuntimeError("Kroger credentials not set in settings")

    url = "https://api.kroger.com/v1/connect/oauth2/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "scope":      "product.compact",
    }

    # use Basic Auth with your client id/secret
    resp = requests.post(
        url,
        headers=headers,
        data=data,
        auth=(settings.KROGER_CLIENT_ID, settings.KROGER_CLIENT_SECRET)
    )

    if resp.status_code != 200:
        logger.error(f"Kroger auth failed {resp.status_code}: {resp.text}")
        raise RuntimeError("Could not fetch Kroger access token")
    token = resp.json().get("access_token")
    if not token:
        raise RuntimeError("Kroger returned no access_token")
    return token

def search_kroger_products(product_id, location_id="01400943"):
    """Search for products using a keyword."""
    access_token = get_kroger_access_token()
    if not access_token:
        raise RuntimeError("Could not fetch Kroger access token")
    url = f"https://api.kroger.com/v1/products/{product_id}"
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"filter.locationId": location_id}
    resp = requests.get(url, headers=headers, params=params)
    resp.raise_for_status()
    data = resp.json().get("data")
    if isinstance(data, dict):
        item = data
    elif isinstance(data, list) and data:
        item = data[0]
    else:
        return None

    # grab the first image URL, if any
    image_url = item.get("images", [{}])[0].get("url", "")
    
    # upsert our Product, now including image_url
    product, created = Product.objects.update_or_create(
        product_id=product_id,
        defaults={
            "name":          item.get("description", ""),
            "brand":         item.get("brand", ""),
            "upc":           item.get("upc"),
            "current_price": (
                item.get("items", [{}])[0]
                    .get("price", {})
                    .get("regular", 0.0)
            ),
            "last_updated":  timezone.now(),
            "image_url":     image_url,
        }
    )
    return item

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