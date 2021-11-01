from . import views
from django.urls import path, include

app_name = "ordinibar"
urlpatterns = [
    path("", views.indexView, name = "index"),
    path('login', views.loginView, name = 'login' ),
    path('index/getitemlist', views.getProdottiView, name = 'get_item_list'),
    path('ordine', views.ordineView, name = 'ordine'),
]