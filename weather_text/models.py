from django.db import models

class WeatherText(models.Model):
    field = [
        ('سرد', 'سرد'),
        ('گرم', 'گرم'),
        ('بارونی', 'بارونی'),
        ('برفی', 'برفی'),
        ('آفتابی', 'آفتابی'),
    ]
    
    text = models.CharField(max_length=100 , verbose_name = 'متن')
    category = models.CharField(max_length=100, choices=field , verbose_name = 'دسته بندی')

    class Meta:
        verbose_name = 'متن برای آب و هوا'
        verbose_name_plural = 'متن برای آب و هوا-'

    def __str__(self):
        return self.text + ' - ' + self.category