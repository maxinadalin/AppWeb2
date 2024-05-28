# urls.py

from django.urls import path
from .views import CreatePaymentView

urlpatterns = [
    path('create-payment/', CreatePaymentView.as_view(), name='create-payment'),
    path('paypal-client-id/', PayPalClientIDView.as_view(), name='paypal-client-id'),
    # Otras rutas...
]
