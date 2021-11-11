from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
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
def accountView(request):
    return render(request=request, template_name='ordinibar/account.html')

def logoutView(request):
    logout(request)
    return redirect("ordinibar:index")

@login_required(login_url="/login")
def getListOrdini(request):
    user = request.user
    lista_ordini = Ordine.objects.filter(nome_utente = user).all()
    return_list = list()
    for ordine in lista_ordini:
        prodotti_ordine = ordine.lista_prodotti.objects.all()
        lista_prodotti = list()
        for prodotto in prodotti_ordine:
            prodotto_base = prodotto.prodotto
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
        
