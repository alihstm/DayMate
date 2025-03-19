# from django import forms
# from .models import ToDoList
# import jdatetime

# class TaskForm(forms.ModelForm):
#     class Meta:
#         model = ToDoList
#         fields = ['title', 'description', 'completed', 'priority', 'due_date', 'hashtags']

#     # تبدیل تاریخ میلادی به تاریخ شمسی در فرم
#     def clean_due_date(self):
#         due_date = self.cleaned_data.get('due_date')
#         if due_date:
#             # تبدیل تاریخ به شمسی
#             return jdatetime.datetime.fromgregorian(datetime=due_date)
#         return None
