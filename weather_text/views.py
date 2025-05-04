from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WeatherText
from .serializers import WeatherTextSerializer
from rest_framework.permissions import AllowAny

import random

class WeatherTextView(APIView):
    permission_classes = [AllowAny]

    def get(self , request , category=None):
        if category:
            texts = WeatherText.objects.filter(category=category)
        else:
            texts = WeatherText.objects.all()

        serializer = WeatherTextSerializer(instance = texts , many=True)
        return Response(serializer.data)

