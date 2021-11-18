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
    path('ordine/inviaordine', views.inviaOrdine, name = "invia_ordine"),
    path('account', views.accountView, name = 'account'),
    path('ordineconfermato', views.ordineConfermatoView, name = 'ordine_confermato'),
    path('ordineconfermato/getlastpk', views.getLastUserOrder, name = 'get_last_pk'),
    path('cronologia', views.cronologiaView, name = 'cronologia'),
    path('cronologia/getCronologiaOrdini', views.getCronologiaOrdini, name = "get_cronologia_ordini"),
    #admin pages
    path('administration', admin_views.indexAdminView, name = 'index_admin'),
    path('administration/orderlist', admin_views.orderListAdminView, name= 'order_list_admin'),
    path('administration/ordineaccettato', admin_views.OrdineAccettatoView, name = 'ordine_accettato_admin'),
    path('administration/ordine', admin_views.OrdineView , name = 'ordine_admin'),
    path('administration/qrscanner', admin_views.QrScannerView, name = 'qr_scanner'),
]

