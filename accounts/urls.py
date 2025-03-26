from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, LogoutView, UserProfileView , GetAllUser
from django.contrib import admin



urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
    path('auth/all_user/' , GetAllUser.as_view() , name='all_user')
]














# urlpatterns = [
#     path('auth/register/' , RegisterView.as_view() , name = 'register'),
#     path('auth/login/', LoginView.as_view(), name='login'),
#     path('auth/logout/', LogoutView.as_view(), name='logout'),
#     path('auth/all_user/' , GetUser.as_view() , name='user_detail'),
#     path('auth/profile_user/' , UserProfileView.as_view() , name='user_detail'),


#     # JWT token
#     path('auth/token/' , TokenObtainPairView.as_view(), name='token_obtaim'),
#     path('auth/token/refresh/' , TokenRefreshView.as_view() , name='token_refresh'),
# ]
