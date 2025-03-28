from rest_framework import serializers
from .models import Product, PriceHistory

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class PriceHistorySerializer(serializers.ModelSerializer):
    # Optionally show product info
    product = ProductSerializer(read_only=True)

    class Meta:
        model = PriceHistory
        fields = ('id', 'product', 'price', 'timestamp')