from django.contrib.auth.forms import AuthenticationForm
from django.http import response
from django.shortcuts import render, redirect, resolve_url
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.utils.regex_helper import flatten_result
from .forms import UserLoginForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.http.response import JsonResponse
import json
from .models import *
from .forms import *

# Create your views here.
@login_required(login_url="/login")
def indexView(request):
    return render(request=request, template_name="ordinibar/mainlist.html")
    
@csrf_exempt
def getProdottiView(request):
    request_dict = json.loads(request.body.decode('UTF-8'))
    item_list = ProdottoDaVendere.objects.filter(tipo = request_dict["tipo"]).all()
    response_list = list()
    for item in item_list:
        item_dict = dict()
        item_dict["nome"] = item.nome
        item_dict["prezzo"] = item.prezzo
        item_dict["tipo"] = item.tipo
        item_dict["aggiunte"] = item.aggiunte
        response_list.append(item_dict)
    return JsonResponse(response_list, safe = False)

@csrf_exempt
def loginView(request):
    if request.method == "POST":
            form = UserLoginForm(request, data=request.POST)
            if form.is_valid():
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    messages.info(request, f"You are now logged in as {username}.")
                    if(request.user.is_superuser):
                        return redirect("ordinibar:index_admin")
                    else:
                        return redirect("ordinibar:index")
                else:
                    messages.error(request,"Invalid username or password.")
            else:
                messages.error(request,"Invalid username or password.")
    form = UserLoginForm()
    return render(request=request, template_name="ordinibar/login.html", context={"login_form":form})

@login_required(login_url="/login")
def ordineView(request):
    return render(request=request, template_name="ordinibar/ordine.html")

@login_required(login_url="/login")
def inviaOrdine(request):
    request_dict = json.loads(request.body.decode('UTF-8'))
    print(request.body.decode('UTF-8'))
    ordine = Ordine()

    lista_prodotti = request_dict['lista_prodotti']
    orario = request_dict['orario']
    numero_ketchup = request_dict['ketchup']
    numero_maionesi = request_dict['maionesi']

    ordine.orario = orario
    ordine.numero_ketchup = numero_ketchup
    ordine.numero_maionesi = numero_maionesi
    ordine.id_utente = request.user.id
    ordine.stato = "todo"
    ordine.save()

    for prodotto in lista_prodotti:
        #print(prodotto)
        nome = prodotto["nome"]
        quantita = prodotto["quantita"]
        prodotto_da_vendere = ProdottoDaVendere.objects.filter(nome = nome).last()
        #print(prodotto_da_vendere, quantita)
        # if prodotto_da_vendere == None:
        #     response = dict()
        #     response["result"] = False
        #     return JsonResponse(response, safe=False)

        p = ProdottoOrdinato.objects.create(id_prodotto = prodotto_da_vendere.pk, quantita = quantita)
        ordine.lista_prodotti.add(p)

    

    response = dict()
    response["result"] = True
    
    return JsonResponse(response, safe=False)

@login_required(login_url="/login")
def getLastUserOrder(request):
    user = request.user
    pk = Ordine.objects.filter(id_utente = user.pk).last().pk

    response_dict = dict()
    response_dict['primary_key'] = pk
    return JsonResponse(response_dict, safe=False)

@login_required(login_url="/login")
def accountView(request):
    if request.method == "POST":
        form = ChangePasswordForm(data=request.POST)
        if form.is_valid():
            #form valido
            vecchia_password = form.cleaned_data.get('vecchia_password')
            nuova_password = form.cleaned_data.get('nuova_password')
            conferma_password = form.cleaned_data.get('conferma_password')
            user = request.user
            if(nuova_password == conferma_password) and user.check_password(vecchia_password):
                #change the password
                user.set_password(nuova_password)  # replace with your real password
                user.save()
            else:
                print("Le due password non coincidono")
        else:
            print('Form non valido')


    change_password_form = ChangePasswordForm()
    return render(request=request, template_name='ordinibar/account.html', context={"change_password_form":change_password_form})

def logoutView(request):
    logout(request)
    return redirect("ordinibar:index")

@login_required(login_url="/login")
def ordineConfermatoView(request):
    return render(request=request, template_name="ordinibar/ordine_confirmed.html")


@login_required(login_url="/login")
def cronologiaView(request):
    return render(request= request, template_name='ordinibar/cronologia.html')

@login_required(login_url="/login")
def getCronologiaOrdini(request):
    user = request.user
    lista_ordini = Ordine.objects.filter(id_utente = user.pk).all()
    return_list = list()
    for ordine in lista_ordini:
        prodotti_ordine = ordine.lista_prodotti.all()
        lista_prodotti = list()
        for prodotto in prodotti_ordine:
            prodotto_base = ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last()
            dict_prodotto = dict()
            dict_prodotto['nome'] = prodotto_base.nome
            dict_prodotto['prezzo'] = prodotto_base.prezzo
            dict_prodotto['aggiunte'] = prodotto_base.aggiunte
            dict_prodotto['quantita'] = prodotto.quantita
            lista_prodotti.append(dict_prodotto)
        dict_ordine = dict()
        dict_ordine['ordine'] = lista_prodotti
        return_list.append(dict_ordine)
    
    return JsonResponse(return_list, safe= False)

        
