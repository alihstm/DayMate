from rest_framework import serializers
from .models import ToDoList , HashTag

class HashTagSerialzers(serializers.ModelSerializer):
    class Meta:
        model = HashTag
        fields = '__all__'



class ToDoListSerializer(serializers.ModelSerializer):
    hashtags = HashTagSerialzers(many=True)
    class Meta:
        model =  ToDoList
        fields = ['id' , 'description' , 'completed' , 'priority' , 'due_date' , 'hashtags']