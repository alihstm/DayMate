from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import AllowAny


from .models import ToDoList , HashTag
from .serializers import ToDoListSerializer , HashTagSerialzers


class ToDoListApiView(APIView):
    permission_classes=[AllowAny]
    #Get All Task List
    def get(self , request):
        # get all task list
        to_do_list = ToDoList.objects.all()
        serializer = ToDoListSerializer(instance=to_do_list , many=True)
        
        return Response(serializer.data ,  status=status.HTTP_200_OK)

    def post(self , request):
        serializer = ToDoListSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                serializer.validated_data['user'] = request.user
                serializer.save()
                return Response(serializer.data , status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'مشتی تو که لاگین نیستی'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    def put(self , request , pk):
        post = ToDoList.objects.get(id=pk)
        serializer = ToDoListSerializer(instance=post , data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_200_OK)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self , request , pk):
        post = ToDoList.objects.get(id=pk)
        post.delete()
        return Response({'message': 'تسک ناراحت شد ولی حذف شد'}, status=status.HTTP_200_OK)
    
    
    
    