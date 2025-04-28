from rest_framework import serializers
from .models import Product, PriceHistory, PriceAlert, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class PriceHistorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = PriceHistory
        fields = ('id', 'product', 'price', 'timestamp')
        
class PriceAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceAlert
        fields = '__all__'
#jen added for add to cart functionality using endpoint
class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.CharField(write_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'session_id']

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        try:
            product = Product.objects.get(product_id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found.")

        return CartItem.objects.create(product=product, **validated_data)
