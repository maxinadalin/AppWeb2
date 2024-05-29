from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.products.models import Product
from django.core.mail import send_mail
import paypalrestsdk
import logging
import requests
from requests.auth import HTTPBasicAuth


# Configurar el logging
logging.basicConfig(level=logging.INFO)

# Configuración de PayPal
paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # "sandbox" o "live"
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET
})


class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            # URL para obtener el token de acceso
            url = f"https://api.{settings.PAYPAL_MODE}.paypal.com/v1/oauth2/token"

            # Cabeceras de la solicitud
            headers = {
                "Accept": "application/json",
                "Accept-Language": "en_US"
            }

            # Datos de la solicitud
            data = {
                "grant_type": "client_credentials"
            }

            # Realizar la solicitud
            response = requests.post(
                url,
                headers=headers,
                data=data,
                auth=HTTPBasicAuth(settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET)
            )

            if response.status_code == 200:
                access_token = response.json().get("access_token")
                return Response({"access_token": access_token})
            else:
                return Response(response.json(), status=response.status_code)

        except Exception as e:
            logging.error(f"Error obtaining access token: {str(e)}")
            return Response({"error": str(e)}, status=500)


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        tax = 0.21

        try:
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            cart_items = CartItem.objects.filter(cart=cart)

            total_amount = 0.0
            total_compare_amount = 0.0

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'A product with the provided ID does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Not enough items in stock'},
                        status=status.HTTP_200_OK
                    )
                
                total_amount += (float(cart_item.product.price) * float(cart_item.count))
                total_compare_amount += (float(cart_item.product.compare_price) * float(cart_item.count))

            total_compare_amount = round(total_compare_amount, 2)
            original_price = round(total_amount, 2)

            estimated_tax = round(total_amount * tax, 2)
            total_amount += (total_amount * tax)
            total_amount = round(total_amount, 2)

            return Response({
                'original_price': f'{original_price:.2f}',
                'total_amount': f'{total_amount:.2f}',
                'total_compare_amount': f'{total_compare_amount:.2f}',
                'estimated_tax': f'{estimated_tax:.2f}',
            },
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {'error': 'Something went wrong when retrieving payment total information'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        tax = 0.18

        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        country_region = data['country_region']
        telephone_number = data['telephone_number']

        cart = Cart.objects.get(user=user)

        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Need to have items in cart'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart_items = CartItem.objects.filter(cart=cart)

        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += (float(cart_item.product.price) * float(cart_item.count))
        
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/",
                "cancel_url": "http://localhost:3000/*"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": str(total_amount),
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": str(total_amount),
                    "currency": "USD"
                },
                "description": "This is the payment transaction description."
            }]
        })

            # Crear y enviar el pago
        if payment.create():
            print("Payment created successfully")

            # Acceder a la ID de la transacción
            transaction_id = payment.transactions[0].related_resources[0].sale.id
            print("Transaction ID:", transaction_id)

            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = link.href
                    print("Redirect for approval: %s" % (approval_url))
        else:
            print("Error while creating payment:")
            print(payment.error)
 
class ExecutePaymentView(APIView):
    def get(self, request, format=None):
        payment_id = request.query_params.get('paymentId')
        payer_id = request.query_params.get('PayerID')

        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            user = request.user

            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            full_name = request.data['full_name']
            address_line_1 = request.data['address_line_1']
            address_line_2 = request.data['address_line_2']
            city = request.data['city']
            state_province_region = request.data['state_province_region']
            postal_zip_code = request.data['postal_zip_code']
            country_region = request.data['country_region']
            telephone_number = request.data['telephone_number']

            total_amount = sum(float(cart_item.product.price) * float(cart_item.count) for cart_item in cart_items)

            try:
                for cart_item in cart_items:
                    update_product = Product.objects.get(id=cart_item.product.id)
                    quantity = int(update_product.quantity) - int(cart_item.count)
                    sold = int(update_product.sold) + int(cart_item.count)
                    Product.objects.filter(id=cart_item.product.id).update(
                        quantity=quantity, sold=sold
                    )

                order = Order.objects.create(
                    user=user,
                    transaction_id=payment.id,
                    amount=total_amount,
                    full_name=full_name,
                    address_line_1=address_line_1,
                    address_line_2=address_line_2,
                    city=city,
                    state_province_region=state_province_region,
                    postal_zip_code=postal_zip_code,
                    country_region=country_region,
                    telephone_number=telephone_number,
                )
                print('Orden creada con éxito. ID de la orden:', order.id)

                for cart_item in cart_items:
                    product = Product.objects.get(id=cart_item.product.id)
                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )

                send_mail(
                    'Your Order Details',
                    'Hey ' + full_name + ','
                    + '\n\nWe received your order!'
                    + '\n\nGive us some time to process your order and ship it out to you.'
                    + '\n\nYou can go to your user dashboard to check the status of your order.'
                    + '\n\nSincerely,'
                    + '\nShop Time',
                    'maxitunn17@gmail.com',
                    [user.email],
                    fail_silently=False)

                CartItem.objects.filter(cart=cart).delete()
                Cart.objects.filter(user=user).update(total_items=0)

                return Response(
                    {'success': 'Transaction successful and order was created'},
                    status=status.HTTP_200_OK
                )

            except Exception as e:
                logging.error("Error procesando la orden:", e)
                return Response(
                    {'error': 'Transaction succeeded but failed to process order details'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(
                {'error': 'Payment execution failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


