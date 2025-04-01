from rest_framework import serializers
from .models import RandomTask

class RandomTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomTask
        fields = '__all__'
