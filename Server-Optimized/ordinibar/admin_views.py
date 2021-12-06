from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.http.response import HttpResponse, JsonResponse
import json
from .models import *
from .forms import *

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def bivioView(request):
    return render(request = request, template_name="ordinibar/admin/bivio.html");

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def listaOrdiniView(request):

    ordini_todo = Ordine.objects.filter(stato = "todo").all()

    lista_ordini = list()
    
    for ordine in ordini_todo:
        dict_ordine = dict()
        dict_ordine["username"] = User.objects.filter(pk = ordine.id_utente).last()
        dict_ordine["orario"] = ordine.orario
        dict_ordine["data"] = ordine.data
        dict_ordine["pk"] = ordine.pk
        dict_ordine["stato"] = ordine.stato
        try:
            prezzo_ordine = 0
            json_dict = dict()
            json_dict["pk"] = ordine.pk
            json_dict["orario"] = ordine.orario
            json_dict["data"] = ordine.data

            lista_prodotti = ordine.lista_prodotti.all()
            for prodotto in lista_prodotti:
                prodotto_base = ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last()
                prezzo_ordine += prodotto_base.prezzo * prodotto.quantita
            dict_ordine["prezzo_ordine"] = prezzo_ordine
        
        except:
            dict_ordine["prezzo_ordine"] = 0
            print("exception has occurred")
        lista_ordini.append(dict_ordine)

    return render(request = request, template_name="ordinibar/admin/ordini/listaordini.html", context={"lista_ordini":lista_ordini});

def viewOrdineDetail(request, id):
    pass