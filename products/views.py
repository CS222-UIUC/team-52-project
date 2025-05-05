from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .utils import search_kroger_products
from .models import Product, PriceHistory, PriceAlert, CartItem
from .serializers import ProductSerializer, PriceHistorySerializer, PriceAlertSerializer, CartItemSerializer

@api_view(["GET"])
def all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def one_product(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(["POST"])
def create_price_alert(request):
    product_id = request.data.get("product_id")
    email = request.data.get("email")
    target_price = request.data.get("target_price")
    product = get_object_or_404(Product, product_id=product_id)
    alert = PriceAlert.objects.create(
        product=product,
        email=email,
        target_price=target_price,
        is_active=True
    )
    
    serializer = PriceAlertSerializer(alert)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class PriceHistoryView(APIView):
    
    def get(self, request, product_id):
        product = get_object_or_404(Product, product_id=product_id)
        histories = PriceHistory.objects.filter(product=product).order_by('-timestamp')
        serializer = PriceHistorySerializer(histories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    ##jen added for add to cart functionality using endpoint
#@api_view(["POST"])
#def add_to_cart(request):
 #   serializer = CartItemSerializer(data=request.data)
  #  if serializer.is_valid():
   #     serializer.save()
    #    return Response(serializer.data, status=status.HTTP_201_CREATED)
    #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(["POST"])
def add_to_cart(request):
    session_id = request.data.get("session_id")
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    if not session_id or not product_id:
        return Response({"error": "Missing session_id or product_id"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        item = CartItem.objects.get(session_id=session_id, product_id=product_id)
        item.quantity += quantity
        item.save()
        serializer = CartItemSerializer(item)
    except CartItem.DoesNotExist:
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
@api_view(["DELETE"])
def remove_from_cart(request, pk):
    item = get_object_or_404(CartItem, pk=pk)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["PATCH"])
def update_cart_quantity(request, pk):
    item = get_object_or_404(CartItem, pk=pk)
    serializer = CartItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
##jen
@api_view(["GET"])
def get_cart_items(request):
    session_id = request.query_params.get("session_id")
    if not session_id:
        return Response({"error": "Missing session_id"}, status=status.HTTP_400_BAD_REQUEST)

    cart_items = CartItem.objects.filter(session_id=session_id)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
