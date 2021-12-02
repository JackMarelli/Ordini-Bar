from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class':'validate','placeholder': 'Username'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Password',}))

class ChangePasswordForm(forms.Form):
    vecchia_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Vecchia password',}))
    nuova_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Nuova password',}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Conferma password',}))

class UserRegisterForm(forms.Form):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(widget=TextInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Password'}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Conferma password'}))