from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .utils import search_kroger_products
from .models import Product, PriceHistory
from .serializers import ProductSerializer, PriceHistorySerializer

@api_view(["GET"])
def search_products(request):
    
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



    keyword = request.query_params.get("q")
    location_id = request.query_params.get("location_id")  # Optional for more specific results
    
    if not keyword:
        return Response({"error": "Keyword parameter 'q' is required."}, status=400)
    
    try:
        products = search_kroger_products(keyword, location_id)
        return Response(products)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
    
class PriceHistoryView(APIView):
    """
    GET /api/products/<product_id>/history/
    Returns the price history for a given product.
    """
    def get(self, request, product_id):
        product = get_object_or_404(Product, product_id=product_id)
        histories = PriceHistory.objects.filter(product=product).order_by('-timestamp')
        serializer = PriceHistorySerializer(histories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)