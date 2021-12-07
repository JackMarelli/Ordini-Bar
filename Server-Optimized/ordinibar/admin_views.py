from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.http.response import HttpResponse, JsonResponse
import json
from .models import *
from .forms import *
from .send_emails import *

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
        dict_ordine["stato"] = ordine.stato
        dict_ordine["maionesi"] = ordine.numero_maionesi
        dict_ordine["ketchup"] = ordine.numero_ketchup
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
    if request_dict["new_status"] == "refused":
        user = User.objects.filter(pk = order.id_utente).last()
        send_order_refused_email(user.email, user.username)
    if request_dict["new_status"] == "doing":
        user = User.objects.filter(pk = order.id_utente).last()
        send_email_ordine_accettato(user.email, user.username)
    if request_dict["new_status"] == "closed":
        user = User.objects.filter(pk = order.id_utente).last()
        send_email_ordine_pronto(user.email, user.username)
    return HttpResponse("")#return nothing

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def QrScannerView(request):
    return render(request=request, template_name="ordinibar/admin/ordini/qrscanner.html")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def ListaProdottiView(request):

    prodotti = ProdottoDaVendere.objects.all()

    lista_prodotti = list()

    for prodotto in prodotti:
        prodotto_dict = dict()
        prodotto_dict["nome"] = prodotto.nome
        prodotto_dict["prezzo"] = prodotto.prezzo
        prodotto_dict["pk"] = prodotto.pk
        lista_prodotti.append(prodotto_dict)

    return render(request=request, template_name="ordinibar/admin/prodotti/listaprodotti.html", context={"lista_prodotti":lista_prodotti})

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def ChangeProductView(request,id):
    prodotto = ProdottoDaVendere.objects.filter(pk = id).last()
    prodotto_dict = dict()
    prodotto_dict["nome"] = prodotto.nome
    prodotto_dict["prezzo"] = prodotto.prezzo
    prodotto_dict["aggiunte"] = prodotto.aggiunte
    prodotto_dict["tipo"] = prodotto.tipo
    prodotto_dict["pk"] = prodotto.pk
    return render(request=request, template_name="ordinibar/admin/prodotti/prodotto.html", context={"prodotto":prodotto_dict})

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def deleteProduct(request):
    id = json.loads(request.body.decode('UTF-8'))["pk"]
    ordini_to_do = Ordine.objects.filter(stato = "todo").filter(lista_prodotti__id_prodotto = id).all()
    for ordine in ordini_to_do:
        user = User.objects.filter(pk = ordine.id_utente).last()
        send_order_refused_email(user.email, user.username)
    
    ordini_doing = Ordine.objects.filter(stato = "doing").filter(lista_prodotti__id_prodotto = id).all()
    for ordine in ordini_doing:
        user = User.objects.filter(pk = ordine.id_utente).last()
        send_order_refused_email(user.email, user.username)

    ProdottoDaVendere.objects.filter(pk = id).delete()
    return HttpResponse("")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def cambiaNome(request):
    json_dict = json.loads(request.body.decode("UTF-8"))
    id = json_dict["pk"]
    nome = json_dict["nome"]
    prodotto = ProdottoDaVendere.objects.filter(pk = id).last()
    prodotto.nome = nome
    prodotto.save()
    return HttpResponse("")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def cambiaPrezzo(request):
    json_dict = json.loads(request.body.decode("UTF-8"))
    id = json_dict["pk"]
    prezzo = json_dict["prezzo"]
    prodotto = ProdottoDaVendere.objects.filter(pk = id).last()
    prodotto.prezzo = prezzo
    prodotto.save()
    return HttpResponse("")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def setAggiunte(request):
    json_dict = json.loads(request.body.decode("UTF-8"))
    id = json_dict["pk"]
    aggiunte = json_dict["aggiunte"]
    prodotto = ProdottoDaVendere.objects.filter(pk = id).last()
    prodotto.aggiunte = aggiunte
    prodotto.save()
    return HttpResponse("")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def AggiungiProdottoView(request):
    return render(request=request, template_name="ordinibar/admin/prodotti/aggiungiprodotto.html")

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def AddNewProduct(request):
    json_dict = json.loads(request.body.decode('UTF-8'))
    nome = json_dict["nome"]
    prezzo = json_dict["prezzo"]
    tipo = json_dict["tipo"]
    aggiunte = json_dict["aggiunte"]
    
    if not ProdottoDaVendere.objects.filter(nome = nome).exists():
        prodotto = ProdottoDaVendere(nome = nome, prezzo = prezzo, tipo = tipo, aggiunte = aggiunte)
        prodotto.save()
        dict_risposta = dict()
        dict_risposta["risposta"] = True
        return JsonResponse(dict_risposta,safe=False)
    else:
        dict_risposta = dict()
        dict_risposta["risposta"] = False
        return JsonResponse(dict_risposta,safe=False)
    