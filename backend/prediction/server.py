from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import base64
from io import BytesIO
import mysql.connector
from datetime import datetime, timedelta

matplotlib.use('Agg')
app = Flask(__name__)
CORS(app)  # allow frontend requests

# MySQL connection
db = mysql.connector.connect(
    host='10.251.161.254',
    user='andrew',
    password='SBYCTh$!G5it',
    database='kroger_db'
)

@app.route('/generate-plot')
def generate_plot():
    product_id = request.args.get('product_id')
    if not product_id:
        return jsonify({"error": "Missing product_id"}), 400

    try:
        # Pull price history for the last 10 days
        query = """
            SELECT price, timestamp
            FROM products_pricehistory
            WHERE product_id = %s AND timestamp >= NOW() - INTERVAL 10 DAY
            ORDER BY timestamp ASC
        """
        cursor = db.cursor()
        cursor.execute(query, (product_id,))
        data = cursor.fetchall()

        if not data:
            return jsonify({"image": None})

        df = pd.DataFrame(data, columns=['price', 'timestamp'])

        # Plot
        plt.figure(figsize=(6, 4))
        plt.plot(df['timestamp'], df['price'], marker='o', linestyle='-', color='blue')
        plt.xlabel('Date')
        plt.ylabel('Price ($)')
        plt.title(f'Price Trend (Last 10 Days)')
        plt.grid(True)

        # Convert to base64
        buf = BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        image_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close()

        return jsonify({"image": image_base64})
    
    except Exception as e:
        print("Error generating plot:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
