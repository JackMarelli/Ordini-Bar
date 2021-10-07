from . import views
from django.urls import path, include

urlpatterns = [
    path("", views.indexView, name = "index"),
    path('login', views.loginView, name = 'login' ),
]