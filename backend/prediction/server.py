from flask import Flask, send_file, request
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os

matplotlib.use('Agg')
app = Flask(__name__)

# Ensure the images directory exists
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

@app.route('/generate-plot', methods=['GET'])
def generate_plot():
    #product_name = request.args.get('product', 'default_product')
    product_name = request.args.get('product', 'default_product').replace(" ", "_")
    
    # Simulated price data (Replace with actual database query later)
    days = np.arange(1, 31)
    prices = 10 + np.sin(days / 5) * 3 + np.random.normal(0, 0.5, 30)  # Randomized trend

    # Create a price trend plot
    plt.figure(figsize=(6, 4))
    plt.plot(days, prices, marker='o', linestyle='-', color='blue', label="Price Trend")
    plt.xlabel("Days")
    plt.ylabel("Price ($)")
    plt.title(f"Price Trend for {product_name}")
    plt.legend()
    plt.grid()

    # Save the plot
    #file_path = f"static/{product_name}.png"
    file_path = os.path.join(static_dir, f"{product_name}.png")
    plt.savefig(file_path)
    plt.close()

    return send_file(file_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
