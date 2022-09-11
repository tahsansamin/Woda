from django.db import models

# Create your models here.
class Ride(models.Model):
    start_destination = models.CharField(max_length=500)
    end_destination = models.CharField(max_length=500)
    distance = models.IntegerField(default=0)
    cost = models.IntegerField(default=0)

