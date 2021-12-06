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

    lista_ordini = list()
    #lista ordini da accettare
    ordini_todo = Ordine.objects.filter(stato = "todo").all()
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
            #se si verifica un'eccezione (prodotto eliminato) chiudo l'ordine
            ordine.stato = "refused"
            ordine.save()
            print("exception has occurred")
        lista_ordini.append(dict_ordine)

    #lista ordini in esecuzione
    ordini_doing = Ordine.objects.filter(stato = "doing").all()
    for ordine in ordini_doing:
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
            #se si verifica un'eccezione (prodotto eliminato) chiudo l'ordine
            ordine.stato = "refused"
            ordine.save()
            print("exception has occurred")
        lista_ordini.append(dict_ordine)

    return render(request = request, template_name="ordinibar/admin/ordini/listaordini.html", context={"lista_ordini":lista_ordini});

def viewOrdineDaAccettareDetail(request, id):
    ordine = Ordine.objects.filter(pk = id).last()
    dict_ordine = dict()
    dict_ordine["username"] = User.objects.filter(pk = ordine.id_utente).last()

    try:
        prezzo_ordine = 0
        dict_ordine["pk"] = ordine.pk
        dict_ordine["orario"] = ordine.orario
        dict_ordine["data"] = ordine.data
        json_lista_prodotti = list()
        lista_prodotti = ordine.lista_prodotti.all()
        for prodotto in lista_prodotti:
            json_dict_prodotto = dict()
            json_dict_prodotto["quantita"] = prodotto.quantita
            prodotto_base = ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last()
            json_dict_prodotto["prezzo"] = prodotto_base.prezzo
            json_dict_prodotto["nome"] = prodotto_base.nome
            json_dict_prodotto["aggiunte"] = prodotto_base.aggiunte
            prezzo_ordine += prodotto_base.prezzo * prodotto.quantita
            json_lista_prodotti.append(json_dict_prodotto)
        dict_ordine["prodotti"] = json_lista_prodotti
        dict_ordine["prezzo_ordine"] = prezzo_ordine       
    except:
        print("exception has occurred")
        #se si verifica un'eccezione (prodotto eliminato) chiudo l'ordine
        # ordine.stato = "refused"
        # ordine.save()
        return render("ordinibar:lista_ordini")


    return render(request=request, template_name="ordinibar/admin/ordini/ordine.html", context={'ordine':dict_ordine})

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def changeOrderStatus(request):
    request_dict = json.loads(request.body.decode('UTF-8'))
    order = Ordine.objects.filter(pk = request_dict["pk"]).last()
    order.stato = request_dict["new_status"]
    order.save()
    return HttpResponse("")#return nothing