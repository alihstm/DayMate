# from rest_framework import serializers
# from .models import ToDoList
# import jdatetime

# class ToDoListSerializer(serializers.ModelSerializer):
#     get_jalali_due_date = serializers.ReadOnlyField()
#     get_jalali_created_at = serializers.ReadOnlyField()
#     get_jalali_updated_at = serializers.ReadOnlyField()

#     class Meta:
#         model = ToDoList
#         fields = ['title', 'description', 'completed', 'priority', 'due_date', 'get_jalali_due_date', 'get_jalali_created_at', 'get_jalali_updated_at', 'hashtags', 'user']

#     # اگر نیاز به تبدیل دستی تاریخ‌ها در serializer بود
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         representation['get_jalali_due_date'] = jdatetime.datetime.fromgregorian(datetime=instance.due_date).strftime('%d %B %Y %H:%M:%S') if instance.due_date else None
#         representation['get_jalali_created_at'] = jdatetime.datetime.fromgregorian(datetime=instance.date_created).strftime('%d %B %Y %H:%M:%S')
#         representation['get_jalali_updated_at'] = jdatetime.datetime.fromgregorian(datetime=instance.date_updated).strftime('%d %B %Y %H:%M:%S')
#         return representation
