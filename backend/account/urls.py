
from django.contrib import admin
from django.urls import path, include

from account.api import AdminLoginView


urlpatterns = [
    path('', AdminLoginView.as_view(), name='admin_login'),
]
