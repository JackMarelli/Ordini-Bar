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