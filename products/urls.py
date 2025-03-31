from django.urls import path
from .views import search_products, PriceHistoryView

urlpatterns = [
    path('search/', search_products, name='search-products'),
    path('products/<str:product_id>/history/', PriceHistoryView.as_view(), name='price-history'),
]