import mysql.connector
import random
from datetime import datetime, timedelta

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",           # or your actual host
    user="django_user",
    password="Anaboeing787",
    database="kroger_db"
)
cursor = conn.cursor()

# Set this to match your inserted product's ID
product_id = 999

# Generate 30 days of synthetic prices
base_price = 3.29
today = datetime.now()
for i in range(30):
    date = today - timedelta(days=29 - i)
    price = round(base_price + random.uniform(-0.15, 0.15), 2)  # small fluctuation
    cursor.execute("""
        INSERT INTO products_pricehistory (price, timestamp, product_id)
        VALUES (%s, %s, %s)
    """, (price, date, product_id))

conn.commit()
cursor.close()
conn.close()
print("Inserted synthetic price history for product_id =", product_id)
