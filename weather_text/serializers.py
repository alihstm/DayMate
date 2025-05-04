from rest_framework import serializers
from .models import WeatherText

class WeatherTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherText
        fields = '__all__'
