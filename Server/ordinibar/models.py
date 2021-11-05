from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User

# Create your models here.
class ProdottoDaVendere(models.Model):
    nome = models.CharField(max_length = 50)
    prezzo = models.FloatField(default = 0.0)
    tipo = models.CharField(max_length = 20)#Salato/dolce
    aggiunte = models.BooleanField(default= False)#true ->aggiunte

    class Meta:
        verbose_name = 'ProdottoDaVendere'
        verbose_name_plural = 'ProdottiDaVendere'

class ProdottoOrdinato(models.Model):#prodotto che è stato ordinato
    prodotto = models.OneToOneField(ProdottoDaVendere, on_delete=models.DO_NOTHING,)
    quantita = models.IntegerField(default= 0)

    class Meta:
        verbose_name = 'ProdottoOrdinato'
        verbose_name_plural = 'ProdottiOrdinati'

class Ordine(models.Model):#lista dei prodotti presenti in un ordine
    numero_ketchup = models.IntegerField()
    numero_maionesi = models.IntegerField()
    lista_prodotti = models.ManyToManyField(ProdottoOrdinato)
    nome_utente = models.OneToOneField(User, on_delete=models.DO_NOTHING,)
    stato = models.CharField(max_length=25)
    data = models.DateTimeField(auto_now= True)

    class Meta:
        verbose_name = 'Ordine'
        verbose_name_plural = 'Ordini'