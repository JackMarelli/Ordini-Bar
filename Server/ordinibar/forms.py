from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput

#form per il login dell'utente
class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class':'validate','placeholder': 'Username'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Password',}))

#form per il cambio della password dell'utente
class ChangePasswordForm(forms.Form):
    vecchia_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Vecchia password',}))
    nuova_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Nuova password',}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Conferma password',}))

#form per la registrazione dell'utente
class UserRegisterForm(forms.Form):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(widget=TextInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Password'}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Conferma password'}))

#form per aggiungere un prodotto
class AddProductForm(forms.Form):
    nome = forms.CharField()
    prezzo = forms.IntegerField()
    CHOICES=[('dolce','dolce'),('salato','salato'),]
    tipo = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect)
    #aggiunte = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect)
