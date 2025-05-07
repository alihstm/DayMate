from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField()
    bio = serializers.CharField(allow_blank=True, required=False)
    job = serializers.CharField(max_length=100, allow_blank=True, required=False)
    favorite = serializers.CharField(max_length=100, allow_blank=True, required=False)
    birth_date = serializers.DateField(allow_null=True, required=False)
    phone_number = serializers.CharField(max_length=11, allow_blank=True, required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'email', 'bio', 'job', 'favorite', 'birth_date', 
                 'phone_number', 'created_at', 'updated_at']
