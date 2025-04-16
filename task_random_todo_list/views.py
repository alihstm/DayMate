from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RandomTask
from .serializers import RandomTaskSerializer
from rest_framework.permissions import AllowAny

import random

class RandomTaskView(APIView):
    permission_classes = [AllowAny]
    def get(self , request):
        tasks = RandomTask.objects.all()
        random_task = random.choice(tasks)
        serializer = RandomTaskSerializer(random_task)
        return Response(serializer.data)
    
    def post(self , request):
        serializer = RandomTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)