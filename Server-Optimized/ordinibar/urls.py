from . import views
from django.urls import path

app_name = 'ordinibar'
urlpatterns = [
    #Urls
    path("login", views.loginView, name = "login"),
    path("", views.indexView, name = "index"),
    path("ordine",views.ordineView, name = "ordine"),
    path("ordine/addordine", views.addOrdineView, name = "add_ordine"),
    path("ordineconfirmed", views.ordineConfirmedView, name="ordine_confirmed"),
    path("account", views.accountView, name = "account"),
]