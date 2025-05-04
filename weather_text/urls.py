from django.urls import path
from .views import WeatherTextView

urlpatterns = [
    path('weather/' , WeatherTextView.as_view() , name= 'weather-text'),
    path('weather/<str:category>/', WeatherTextView.as_view(), name='weather-by-category'),

]

