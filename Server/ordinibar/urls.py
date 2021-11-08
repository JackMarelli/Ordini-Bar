from . import views
from . import admin_views
from django.urls import path, include
from django.views.generic.base import RedirectView

app_name = "ordinibar"

urlpatterns = [
    path('logout', views.logoutView, name = "logout"),
    #user pages
    path("", views.indexView, name = "index"),
    path('login', views.loginView, name = 'login' ),
    path('index/getitemlist', views.getProdottiView, name = 'get_item_list'),
    path('ordine', views.ordineView, name = 'ordine'),
    path('account', views.accountView, name = 'account'),
    #admin pages
    path('administration', admin_views.indexAdminView, name = 'index_admin'),
    path('administration/orderlist', admin_views.orderListAdminView, name= 'order_list_admin'),
]

