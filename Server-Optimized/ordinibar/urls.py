from . import views
from django.urls import path

app_name = 'ordinibar'
urlpatterns = [
    #Urls
    path("login", views.loginView, name = "login"),
    path("", views.indexView, name = "index"),
]