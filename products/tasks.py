from celery import shared_task
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .models import PriceAlert, Product
from celery import shared_task
from .utils import search_kroger_products
from django.utils import timezone

@shared_task
def fetch_kroger_data():

    keywords = ["bread", "eggs", "fruit", "dairy", "meat", "veggies", "oil", "sriracha", "cereal"]
    for keyword in keywords:
        search_kroger_products(keyword)
        
    Product.objects.all().update(last_updated=timezone.now())

@shared_task
def check_price_alerts():
    """Periodically checks all active price alerts and sends email via SendGrid if the product's price is below the target."""
    alerts = PriceAlert.objects.filter(is_active=True)
    for alert in alerts:
        product = alert.product
        if product.current_price is not None and product.current_price <= alert.target_price:
            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,  # Verified sender in SendGrid
                to_emails=alert.email,
                subject=f"Price Drop Alert: {product.name}",
                html_content=(
                    f"<p>The price for <strong>{product.name}</strong> "
                    f"has dropped to <strong>${product.current_price:.2f}</strong>, "
                    f"below your target of <strong>${alert.target_price:.2f}</strong>!</p>"
                ),
            )

            try:
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                response = sg.send(message)
                print(f"✅ Email sent to {alert.email} - Status {response.status_code}")

                # Optionally deactivate alert after sending
                alert.is_active = False
                alert.save()

            except Exception as e:
                print(f"❌ Failed to send email to {alert.email}: {e}")