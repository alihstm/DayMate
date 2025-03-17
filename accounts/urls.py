from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/' , RegisterView.as_view() , name = 'register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/' , UserDetailsView.as_view() , name='user_detail'),

    # JWT token
    path('auth/token/' , TokenObtainPairView.as_view(), name='token_obtaim'),
    path('auth/token/refresh/' , TokenRefreshView.as_view() , name='token_refresh'),
]
