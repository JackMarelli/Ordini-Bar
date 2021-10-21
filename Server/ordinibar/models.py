from django.db import models
from django.db.models.base import Model

# Create your models here.
class ProdottoDaVendere(models.Model):
    nome = models.CharField(max_length = 50)
    prezzo = models.FloatField(default = 0.0)
    tipo = models.CharField(max_length = 20)#Salato/dolce

    class Meta:
        verbose_name = 'ProdottoDaVendere'
        verbose_name_plural = 'ProdottiDaVendere'