from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=100)
    telephone1 = models.CharField(max_length=20,unique=True)
    telephone2 = models.CharField(max_length=20)
    profession = models.CharField(max_length=100)
    email = models.EmailField()