from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
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