from django.urls import path
from . import views

app_name='Arcade'

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/<int:player_id>/', views.dashboard, name='dashboard'),
]
