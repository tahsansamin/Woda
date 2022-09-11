from django.shortcuts import render
from .serializers import RideSerializer
from .models import Ride
from rest_framework import viewsets
from rest_framework import generics


# Create your views here.
class RideViewset(viewsets.ModelViewSet):
    serializer_class = RideSerializer
    queryset = Ride.objects.all()
