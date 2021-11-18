from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.http.response import JsonResponse
import json
from .models import *
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



