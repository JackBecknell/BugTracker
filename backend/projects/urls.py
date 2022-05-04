from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectList.as_view()),
    path('<int:project_id>/', views.ProjectDetail.as_view()),
    path('post/', views.ProjectAuthDetail.as_view()),
    path('delete/<int:pk>/', views.ProjectAuthDetail.as_view()),
    path('put/<int:pk>/', views.ProjectAuthDetail.as_view()),
]