from django.urls import path
from .views import ToDoListListView , TodoListDetailView , TodoListCreateView , TodoListUpdateView , TodoListDeleteView


urlpatterns = [
    path('api/to_do_list/' , ToDoListListView.as_view() , name= 'to_do_list'),
    path('api/to_do_list/<int:pk>/' , TodoListDetailView.as_view() , name= 'to_do_list_detail'),
    path('api/to_do_list/create/' , TodoListCreateView.as_view() , name= 'to_do_list_create'),
    path('api/to_do_list/update/<int:pk>/' , TodoListUpdateView.as_view() , name= 'to_do_list_update'),
    path('api/to_do_list/delete/<int:pk>/' , TodoListDeleteView.as_view() , name= 'to_do_list_delete'),
]