from django.db import models
from django.contrib.auth import get_user_model
import jdatetime

User = get_user_model()

class HashTag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = 'هشتگ'
        verbose_name_plural = 'هشتگ‌ها'

    def __str__(self):
        return self.name


class ToDoList(models.Model):
    priority = [
        ('مهمه برام', 'مهمه برام'),
        ('حسش بود انجام میدم', 'حسش بود انجام میدم'),
        ('حسش فعلا نیس', 'حسش فعلا نیس'),
    ]

    title = models.CharField(max_length=100, verbose_name='عنوان')
    description = models.TextField(verbose_name='توضیحات')
    completed = models.BooleanField(default=False, verbose_name='تکمیل شده')
    priority = models.CharField(max_length=50, choices=priority, default='حسش فعلا نیس', verbose_name='اولویت')
    due_date = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ سررسید')   
    hashtags = models.ManyToManyField(HashTag, blank=True, related_name='tasks', verbose_name='هشتگ‌ها')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    date_updated = models.DateTimeField(auto_now=True, verbose_name='تاریخ بروزرسانی')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', verbose_name='کاربر')

    class Meta:
        ordering = ['-date_created']
        verbose_name = 'تسک'
        verbose_name_plural = 'تسک‌ها'

    def __str__(self):
        return self.title

    # تغییر به تاریخ شمسی با ماه‌های فارسی
    @property
    def get_jalali_due_date(self):
        if self.due_date:
            # تبدیل تاریخ میلادی به شمسی
            return jdatetime.datetime.fromgregorian(datetime=self.due_date).strftime('%d %B %Y %H:%M:%S')
        return None

    @property
    def get_jalali_created_at(self):
        return jdatetime.datetime.fromgregorian(datetime=self.date_created).strftime('%d %B %Y %H:%M:%S')

    @property
    def get_jalali_updated_at(self):
        return jdatetime.datetime.fromgregorian(datetime=self.date_updated).strftime('%d %B %Y %H:%M:%S')
