from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from apps.orders.models import Order
from django.shortcuts import get_object_or_404
import json
import paypalrestsdk 
from django.conf import settings


class CreatePaymentView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        order_id = data.get('order_id')
        amount = data.get('amount')

        order = get_object_or_404(Order, id=order_id)

        payment = Payment.objects.create(
            order=order,
            user=request.user,
            transaction_id='',
            amount=amount,
            payment_status='pending'
        )
        
        
        paypalrestsdk.configure({
            "mode": settings.PAYPAL_MODE,
            "client_id": settings.PAYPAL_CLIENT_ID,
            "client_secret": settings.PAYPAL_CLIENT_SECRET
        })

        # Crear la orden en PayPal
        payment_data = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": str(amount),
                    "currency": "EUR"
                },
                "description": f"Order {order_id}"
            }],
            "redirect_urls": {
                "return_url": "http://http://localhost:3000/Productos",  # Ajusta según tu configuración
                "cancel_url": "http://http://localhost:3000/"  # Ajusta según tu configuración
            }
        }

        payment_response = paypalrestsdk.Payment(payment_data)

        if payment_response.create():
            payment.transaction_id = payment_response.id
            payment.save()
            return Response({'transaction_id': payment_response.id}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': payment_response.error}, status=status.HTTP_400_BAD_REQUEST)
        
        
class PayPalClientIDView(APIView):
    def get(self, request, *args, **kwargs):
        client_id = settings.PAYPAL_CLIENT_ID
        return Response({"client_id": client_id}, status=status.HTTP_200_OK)