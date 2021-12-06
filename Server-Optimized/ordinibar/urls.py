from ordinibar import admin_views
from . import views
from . import admin_views
from django.urls import path

app_name = 'ordinibar'
urlpatterns = [
    #Urls
    path("login", views.loginView, name = "login"),
    path("logout", views.logoutView, name = "logout"),
    path("", views.indexView, name = "index"),
    path("ordine",views.ordineView, name = "ordine"),
    path("ordine/addordine", views.addOrdineView, name = "add_ordine"),
    path("ordineconfirmed", views.ordineConfirmedView, name="ordine_confirmed"),
    path("account", views.accountView, name = "account"),
    path("cronologia", views.cronologiaView, name ="cronologia"),
    #ADMIN URLS
    path("bivio", admin_views.bivioView, name = "bivio"),
    path("listaordini",admin_views.listaOrdiniView, name = "lista_ordini"),
    path("ordinedaaccettare/<id>/",admin_views.viewOrdineDaAccettareDetail, name = "ordine_da_accettare"),
    path("changeorderstatus", admin_views.changeOrderStatus, name = "change_order_status"),
    path("qrscanner", admin_views.QrScannerView, name = "qr_scanner"),
    path("listaprodotti", admin_views.ListaProdottiView, name = "lista_prodotti"),
]