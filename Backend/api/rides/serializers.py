from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = '__all__'