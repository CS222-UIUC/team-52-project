# from django.urls import path
# from .views import search_products, PriceHistoryView

# urlpatterns = [
#     path('search/', search_products, name='search-products'),
#     path('products/<str:product_id>/history/', PriceHistoryView.as_view(), name='price-history'),
# ]

from django.urls import path
from .views import all_products, one_product, PriceHistoryView, create_price_alert

urlpatterns = [
    path('products/', all_products, name='all-products'),
    path('products/<str:product_id>/', one_product, name='one-product'),
    path('products/<str:product_id>/history/', PriceHistoryView.as_view(), name='product-history'),
    path('price-alerts/', create_price_alert, name='create-price-alert'),
]