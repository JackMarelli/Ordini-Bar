from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput

#form per il cambio della password dell'utente
class ChangePasswordForm(forms.Form):
    request_type = forms.CharField()
    vecchia_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Vecchia password',}))
    nuova_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Nuova password',}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Conferma password',}))

class ChangeEmailForm(forms.Form):
    request_type = forms.CharField()
    password =  forms.CharField(widget=PasswordInput(attrs={'placeholder':'Password'}))
    nuova_email = forms.EmailField()
    conferma_email = forms.EmailField()

#form per la registrazione dell'utente
class UserRegisterForm(forms.Form):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(widget=TextInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Password'}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Conferma password'}))