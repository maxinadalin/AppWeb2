from django.contrib import admin

# Register your models here.
from django.contrib import admin

from apps.products.models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',
                    'price', 'quantity', 'sold', 'price_discount'  )
    list_display_links = ('id', 'name', )
    list_filter = ('category', )
    list_editable = ( 'price', 'quantity','price_discount' )
    search_fields = ('name', 'description', )
    list_per_page = 25

admin.site.register(Product, ProductAdmin)