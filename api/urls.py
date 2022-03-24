

from unicodedata import name
from django.urls import path

from .import views

urlpatterns = [
    path('', views.apiViews),
    path('task-list/', views.taskList,name='task-list'),
    path('task-create/', views.taskCreate),
    path('task-update/<str:pk>/', views.taskUpdate),
    path('task-delete/<str:pk>/', views.taskDelete),
]
