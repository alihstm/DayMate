from django.urls import path
from .views import ToDoListApiView


urlpatterns = [
    path('api/to_do_list/' , ToDoListApiView.as_view() , name= 'to_do_list')
]