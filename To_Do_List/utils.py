# from django.utils import timezone
# import jdatetime

# PERSIAN_MONTHS = {
#     1: 'فروردین',
#     2: 'اردیبهشت',
#     3: 'خرداد',
#     4: 'تیر',
#     5: 'مرداد',
#     6: 'شهریور',
#     7: 'مهر',
#     8: 'آبان',
#     9: 'آذر',
#     10: 'دی',
#     11: 'بهمن',
#     12: 'اسفند'
# }

# def format_jalali_date(date):  # تغییر نام تابع از to_jalali به format_jalali_date
#     if not date:
#         return None
#     j_date = jdatetime.datetime.fromgregorian(datetime=date)
#     return f"{j_date.day} {PERSIAN_MONTHS[j_date.month]} {j_date.year}"