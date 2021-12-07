from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.http.response import HttpResponse, JsonResponse
import json
from .models import *
from .forms import *
from .send_emails import *

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
                    if(request.user.is_superuser):
                         return redirect("ordinibar:bivio")
                    else:
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
    user_last_status = Ordine.objects.filter(id_utente = request.user.pk).last()
    if Ordine.objects.filter(id_utente = request.user.pk).exists():
        last_order_status = user_last_status.stato
        if last_order_status == "todo" or last_order_status == "doing":
            return redirect("ordinibar:ordine_confirmed")
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
    user_last_status = Ordine.objects.filter(id_utente = request.user.pk).last()
    if not(user_last_status == None):
        last_order_status = user_last_status.stato
        if last_order_status == "todo" or last_order_status == "doing":
            return redirect("ordinibar:ordine_confirmed")
    return render(request=request, template_name="ordinibar/ordine.html")

@login_required(login_url="/login")
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
    user = request.user
    ordine = Ordine.objects.filter(id_utente = user.pk).last()
    if Ordine.objects.filter(id_utente = user.pk).exists():  
        if ordine.stato == "doing" or ordine.stato == "todo":
            response_dict = dict()
            response_dict['orario'] = ordine.orario
            response_dict['stato'] = ordine.stato
            response_dict['pk'] = ordine.pk

            lista_prodotti = ordine.lista_prodotti.all()
            prezzo = 0

            for prodotto in lista_prodotti:
                try:
                    prezzo += ProdottoDaVendere.objects.filter(pk = prodotto.id_prodotto).last().prezzo * prodotto.quantita
                except:
                    ordine.stato = "refused"
                    ordine.save()
                    return redirect("ordinibar:index")

            response_dict['prezzo'] = prezzo
            return render(request=request, template_name="ordinibar/ordine_confirmed.html",context={"ordine":response_dict})
        else:
            return redirect("ordinibar:index")
    else:
        return redirect("ordinibar:index")

@login_required(login_url="/login")
def accountView(request):
    change_password_form = ChangePasswordForm()
    change_email_form = ChangeEmailForm()
    user = request.user
    errors = dict()
    # errors["EMAILERR"] = False 
    # errors["PASSERR"] = False 

    if request.method == "POST":
        form_type = request.POST['request_type']
        if form_type == 'email_change':
            #cambio email
            change_email_form = ChangeEmailForm(data=request.POST)
            if change_email_form.is_valid():
                password = change_email_form.cleaned_data.get('password')
                if user.check_password(password):
                    email = change_email_form.cleaned_data.get('nuova_email')
                    conferma_email = change_email_form.cleaned_data.get('conferma_email')

                    #cambio la email
                    if email == conferma_email:
                        #cambio l'email
                        user.email = email
                        user.save()
                        errors["EMAILERR"] = False
                        errors["PASSERR"] = False 
                    else:
                        errors["EMAILERR"] = True
                        errors["PASSERR"] = False 
                else:
                    errors["EMAILERR"] = True  
                    errors["PASSERR"] = True       
        else:
            #cambio password
            change_password_form = ChangePasswordForm(data = request.POST)
            if change_password_form.is_valid():
                vecchia_password = change_password_form.cleaned_data.get('vecchia_password')
                nuova_password = change_password_form.cleaned_data.get('nuova_password')
                conferma_password = change_password_form.cleaned_data.get('conferma_password')

                if user.check_password(vecchia_password):
                    #se la vecchia password è corretta
                    if nuova_password == conferma_password:
                        #se le 2 password corrispondono
                        user.set_password(nuova_password)  # replace with your real password
                        user.save()
                        return redirect("ordinibar:index")

    context = dict()
    context["change_password_form"] = change_password_form
    context["change_email_form"] = change_email_form
    context["errors"] = json.dumps(errors)
    return render(request=request, template_name="ordinibar/account.html", context=context)

def logoutView(request):
    logout(request)
    return redirect("ordinibar:index")

def cronologiaView(request):
    lista_ordini = Ordine.objects.filter(id_utente = request.user.id).all()

    json_array = list()
    

    for ordine in lista_ordini:
        try:
            prezzo_ordine = 0
            json_dict = dict()
            json_dict["pk"] = ordine.pk
            json_dict["orario"] = ordine.orario
            json_dict["data"] = ordine.data
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
            json_dict["prodotti"] = json_lista_prodotti
            json_dict["prezzo_ordine"] = prezzo_ordine
            json_array.append(json_dict)
        
        except:
             print("exception has occurred")

    json_array.reverse()#inverto la lista
    context = dict()
    context["json_object"] = json.dumps(json_array, default=str)
    context["lista_ordini"] = json_array

    return render(request=request, template_name="ordinibar/cronologia.html", context=context)

def registerView(request):
    if request.method == "POST":
        form = UserRegisterForm(data=request.POST)
        if form.is_valid():
            #form valido
            nuova_password = form.cleaned_data.get('password')
            conferma_password = form.cleaned_data.get('conferma_password')
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            if not User.objects.filter(username=username).exists():
                if(nuova_password == conferma_password):
                    #la password  è corretta
                    #registro l'utente
                    user = User.objects.create_user(username=username,email=email,password=nuova_password)
                    user.save()
                    send_new_user_email(email, username)
                    login(request, user)
                    return redirect("ordinibar:index")
                else:
                    print("Le due password non coincidono")
            else:
                print("Username already exists")
        else:
            print('Form non valido')


    user_register_form = UserRegisterForm()
    return render(request=request, template_name="ordinibar/register.html", context={"user_register_form":user_register_form})