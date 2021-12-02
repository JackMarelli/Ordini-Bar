from json.decoder import JSONDecodeError
from django.http import response
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.http.response import JsonResponse
import json
from .models import *
from .forms import *
from django.contrib.auth.decorators import user_passes_test

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def indexAdminView(request):
    return render(request=request, template_name='ordinibar/admin/bivio.html');

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def orderListAdminView(request):
    return render(request=request, template_name='ordinibar/admin/listaordini/listaordini.html')

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def OrdineAccettatoView(request):
    return render(request = request, template_name = 'ordinibar/admin/listaordini/ordine_accettato.html')

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def OrdineView(request):
    return render(request = request, template_name = 'ordinibar/admin/listaordini/ordine.html')

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def QrScannerView(request):
    return render(request = request, template_name = 'ordinibar/admin/listaordini/qrscanner.html')

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def getOrderListStatus(request):
    response = list()
    #get list of all orders that are in doing or in todo state

    #TODO STATE
    todo_orders = Ordine.objects.filter(stato = "todo").all()
    for todo_order in todo_orders:
        order_dict = dict()
        username = User.objects.filter(pk = todo_order.id_utente).last().username
        order_dict["nome"] = username#"Ordine " + str(todo_order.pk)
        #calcolo il prezzo totale

        lista_prodotti = todo_order.lista_prodotti.all()
        prezzo_totale = 0

        for prodotto in lista_prodotti:
            prezzo_totale += prodotto.quantita * ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last().prezzo

        order_dict["prezzo"] = prezzo_totale
        order_dict["orario"] = todo_order.orario
        order_dict["stato"] = "todo"
        order_dict["primaryKey"] = "00"+ str(todo_order.pk)
        response.append(order_dict)

    #DOING STATE

    doing_orders = Ordine.objects.filter(stato = "doing").all()
    for doing_order in doing_orders:
        order_dict = dict()
        username = User.objects.filter(pk = doing_order.id_utente).last().username
        order_dict["nome"] = username
        #calcolo il prezzo totale

        lista_prodotti = doing_order.lista_prodotti.all()
        prezzo_totale = 0

        for prodotto in lista_prodotti:
            prezzo_totale += prodotto.quantita * ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last().prezzo

        order_dict["prezzo"] = prezzo_totale
        order_dict["orario"] = doing_order.orario
        order_dict["stato"] = "doing"
        order_dict["primaryKey"] = "00"+ str(doing_order.pk)
        response.append(order_dict)


    return JsonResponse(response, safe=False)

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def getOrderProductsList(request):
    #print(request.body.decode('UTF-8'))
    request_dict = json.loads(request.body.decode('UTF-8'))
    order = Ordine.objects.filter(pk = request_dict["pk"]).last()
    
    product_list = order.lista_prodotti.all()

    response_product_list = list()

    for product in product_list:
        response_dict = dict()
        response_dict["nome"] = ProdottoDaVendere.objects.filter(pk = product.id_prodotto).last().nome
        response_dict["prezzo"] = ProdottoDaVendere.objects.filter(pk = product.id_prodotto).last().prezzo
        response_dict["quantita"] = product.quantita
        response_product_list.append(response_dict)
    
    response = dict()
    response["prodotti"] = response_product_list
    response["ketchup"] = order.numero_ketchup
    response["maionesi"] = order.numero_maionesi

    return JsonResponse(response, safe=False)

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def changeOrderState(request):
    request_dict = json.loads(request.body.decode('UTF-8'))
    order = Ordine.objects.filter(pk = request_dict["pk"]).last()
    order.stato = request_dict["new_state"]
    order.save()
    return HttpResponse("")#return nothing

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def productListView(request):
    lista_prodotti = ProdottoDaVendere.objects.all()
    context = {"lista_prodotti":lista_prodotti,}
    return render(request = request, template_name = 'ordinibar/admin/gestioneprodotti/listaprodotti.html', context=context)

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def viewProductDetailsView(request):
    return render(request = request, template_name = 'ordinibar/admin/gestioneprodotti/prodotto.html')

@login_required(login_url="/login")
@user_passes_test(lambda u: u.is_superuser)
def aggiungiProdotto(request):
    if request.method == "POST":
        form = AddProductForm(data=request.POST)
        if form.is_valid():
            print("Form valido")
            #aggiungo il prodotto
            nome = form.cleaned_data.get('nome')
            prezzo = form.cleaned_data.get('prezzo')
            tipo = form.cleaned_data.get('tipo')
            print(tipo)
        else:
            print('Form non valido')


    add_product_form =  AddProductForm()
    return render(request = request, template_name = 'ordinibar/admin/gestioneprodotti/aggiungiprodotto.html', context= {"add_product_form":add_product_form})