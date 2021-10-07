from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
@login_required(login_url="/login")
def indexView(request):
    return HttpResponse("Welcome to index page")


def loginView(request):
    if request.method == "POST":
            form = AuthenticationForm(request, data=request.POST)
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
    form = AuthenticationForm()
    return render(request=request, template_name="ordinibar/login.html", context={"login_form":form})
