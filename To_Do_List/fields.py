# from django.forms import DateTimeField
# from django.forms.widgets import DateTimeInput
# import jdatetime
# from .utils import PERSIAN_MONTHS, format_jalali_date

# class JalaliDateTimeField(DateTimeField):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.widget = DateTimeInput(
#             attrs={
#                 'type': 'text',  # تغییر از datetime-local به text
#                 'class': 'jalali-datepicker',
#                 'dir': 'rtl'
#             }
#         )

#     def to_python(self, value):
#         if not value:
#             return None
#         try:
#             # تبدیل متن فارسی به تاریخ میلادی
#             day, month_name, year = value.split(' ')
#             month = list(PERSIAN_MONTHS.keys())[list(PERSIAN_MONTHS.values()).index(month_name)]
#             jalali_date = jdatetime.datetime(int(year), month, int(day))
#             return jalali_date.togregorian()
#         except (ValueError, IndexError):
#             return None

#     def prepare_value(self, value):
#         if value:
#             return format_jalali_date(value)
#         return None