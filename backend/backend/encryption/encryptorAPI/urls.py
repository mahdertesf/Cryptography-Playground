from django.urls import path
from . import views

urlpatterns = [
    path("encryption/",views.encryptorView), 
    path("decryption/",views.decryptorView)
]