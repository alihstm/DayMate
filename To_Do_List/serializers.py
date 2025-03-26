from rest_framework import serializers
from .models import ToDoList , HashTag

class HashTagSerialzers(serializers.ModelSerializer):
    class Meta:
        model = HashTag
        fields = '__all__'



class ToDoListSerializer(serializers.ModelSerializer):
    hashtags = HashTagSerialzers(many=True , required=False)
    class Meta:
        model =  ToDoList
        fields = ['id' ,'title', 'description' , 'completed' , 'priority' , 'due_date' , 'hashtags']