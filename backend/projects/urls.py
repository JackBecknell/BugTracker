from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectList.as_view()),
    path('<int:project_id>/', views.ProjectDetail.as_view()),
]