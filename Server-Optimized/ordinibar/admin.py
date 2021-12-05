from django.contrib import admin
from .models import *

# Register your models here.
class ProdottoDaVendereAdmin(admin.ModelAdmin):
    list_display = ('nome','prezzo','tipo')
admin.site.register(ProdottoDaVendere, ProdottoDaVendereAdmin)