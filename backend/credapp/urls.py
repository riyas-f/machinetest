

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ItemsViewSet
router = DefaultRouter()
router.register(r'items', ItemsViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
