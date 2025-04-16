from django.urls import path
from .views import RandomTaskView

urlpatterns = [
    path('random_task/' , RandomTaskView.as_view() , name= 'random_task')
]

