from django.urls import path
from . import views

urlpatterns = [
    path('', views.CommentAuthList.as_view()),
]