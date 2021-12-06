from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput

#form per il cambio della password dell'utente
class ChangePasswordForm(forms.Form):
    vecchia_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Vecchia password',}))
    nuova_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Nuova password',}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Conferma password',}))

class ChangeEmailForm(forms.Form):
    vecchia_email = forms.EmailField()
    nuova_password = forms.EmailField()
    conferma_password = forms.EmailField()