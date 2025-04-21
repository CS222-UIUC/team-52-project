from celery import shared_task
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .models import PriceAlert, Product, PriceHistory
from celery import shared_task
from .utils import search_kroger_products
from django.utils import timezone
import requests
# from .utils import fetch_price_for_product  # you’d write this

@shared_task
def seed_kroger_products():
    """Run once to grab 9 items, one per keyword."""
    keywords = ["bread","eggs","fruit","dairy","meat","veggies","oil","sriracha","cereal"]
    kept_ids = []
    for kw in keywords:
        p = search_kroger_products(kw)
        if p:
            kept_ids.append(p.product_id)

    # delete any Product not in our 9
    Product.objects.exclude(product_id__in=kept_ids).delete()

@shared_task
def update_kroger_prices():
    """Runs every interval to refresh price & history for existing Products."""
    now = timezone.now()
    for prod in Product.objects.all():
        # re‑use our helper, but this time fetch by keyword=prod.product_id
        # (or write a separate fetch_price_by_id version if you prefer)
        updated = search_kroger_products(prod.product_id)
        if updated:
            # record history
            PriceHistory.objects.create(
                product=updated,
                price=updated.current_price,
                timestamp=now
            )

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