from django.contrib import admin
from . import models

admin.site.register(models.ToDoList)
admin.site.register(models.HashTag)