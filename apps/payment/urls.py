# urls.py

from django.urls import path
from .views import GenerateTokenView,GetPaymentTotalView,ProcessPaymentView,ExecutePaymentView
urlpatterns = [
    path('get-payment-total', GetPaymentTotalView.as_view()),
    path('get-token', GenerateTokenView.as_view()),
    path('make-payment', ProcessPaymentView.as_view()),
    path('execute-payment', ExecutePaymentView.as_view()),
    
]
