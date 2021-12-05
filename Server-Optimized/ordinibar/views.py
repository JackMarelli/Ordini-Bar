from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.http.response import HttpResponse, JsonResponse
import json
from .models import *

# Create your views here.
def loginView(request):
    if request.method == "POST":
            form = AuthenticationForm(request, data=request.POST)
            if form.is_valid():
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    # if(request.user.is_superuser):
                    #     return redirect("ordinibar:index_admin")
                    # else:
                    return redirect("ordinibar:index")
                else:
                    messages.error(request,'LOGERR')
            else:
                print("form non valido")
                messages.error(request,'LOGERR')
    form = AuthenticationForm()
    return render(request=request, template_name="ordinibar/login.html", context={"user_login_form":form})

@login_required(login_url="/login")
def indexView(request):
    products_list = ProdottoDaVendere.objects.all()

    json_array = list()
    for product in products_list:
        json_obj = dict()
        json_obj["nome"] = product.nome
        json_obj["prezzo"] = product.prezzo
        json_obj["tipo"] = product.tipo
        json_obj["aggiunte"] = product.aggiunte
        json_obj["pk"] = product.pk
        json_array.append(json_obj)

    json_string = json.dumps(json_array)
    return render(request=request, template_name="ordinibar/index.html", context={'product_list':json_string})

@login_required(login_url="/login")
def ordineView(request):
    return render(request=request, template_name="ordinibar/ordine.html")

def addOrdineView(request):
    user = request.user
    request_dict = json.loads(request.body.decode('UTF-8'))
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
        p = ProdottoOrdinato.objects.create(id_prodotto = prodotto_da_vendere.pk, quantita = quantita)
        ordine.lista_prodotti.add(p)

    response = dict()
    response["result"] = True
    
    return JsonResponse(response, safe=False)

@login_required(login_url="/login")
def ordineConfirmedView(request):
    return render(request=request, template_name="ordinibar/ordine_confirmed.html")