from django.db import models


class Items(models.Model):
    item1 = models.CharField(max_length=100)
    item2 = models.CharField(max_length=100)
    item3 = models.CharField(max_length=100)