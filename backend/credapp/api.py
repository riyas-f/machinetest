
from rest_framework import viewsets
from .serializers import ItemsSerializer
from .models import Items
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
    permission_classes = []

