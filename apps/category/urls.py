# 3.3
from django.urls import path

from .views import ListCategoriesView,CategoriessView

urlpatterns = [
    path('categories', ListCategoriesView.as_view()),
    path('get-categories', CategoriessView.as_view()),
]