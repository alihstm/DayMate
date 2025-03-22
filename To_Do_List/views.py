from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import ToDoList , HashTag
from .serializers import ToDoListSerializer , HashTagSerialzers


class ToDoListApiView(APIView):
    def get(self , request):
        # get all task list
        to_do_list = ToDoList.objects.all()
        serializer = ToDoListSerializer(instance=to_do_list , many=True)
        return Response(serializer.data ,  status=status.HTTP_200_OK)

    