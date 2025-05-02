from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import AllowAny


from .models import ToDoList , HashTag
from .serializers import ToDoListSerializer , HashTagSerialzers
from .permissions import IsOwnerOrReadOnly

#Get All Task List
class ToDoListListView(APIView):
    permission_classes=[AllowAny]
    def get(self , request):
        to_do_list = ToDoList.objects.all()
        serializer = ToDoListSerializer(instance=to_do_list , many=True)
        
        return Response(serializer.data ,  status=status.HTTP_200_OK)
    

#Get Task List By ID
class TodoListDetailView(APIView):
    permission_classes=[AllowAny]
    def get(self , request , pk):
        to_do_list = ToDoList.objects.get(id=pk)
        serializer = ToDoListSerializer(instance = to_do_list)
        return Response(serializer.data , status=status.HTTP_200_OK)


#Create Task List
class TodoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
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


#Update Task List
class TodoListUpdateView(APIView):
    permission_classes = [IsAuthenticated , IsOwnerOrReadOnly]
    def put(self , request , pk):
        post = ToDoList.objects.get(id=pk)
        self.check_object_permissions(request , post)
        serializer = ToDoListSerializer(instance=post , data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_200_OK)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)


class TodoListDeleteView(APIView):
    permission_classes = [IsAuthenticated , IsOwnerOrReadOnly]
    def delete(self , request , pk):
        post = ToDoList.objects.get(id=pk)
        self.check_object_permissions(request , post)
        post.delete()
        return Response({'message': 'تسک ناراحت شد ولی حذف شد'}, status=status.HTTP_200_OK)


    
    
    