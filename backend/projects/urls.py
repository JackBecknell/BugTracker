from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectAuthList.as_view()),
    path('<int:project_id>/', views.ProjectAuthDetail.as_view()),
    path('post/', views.ProjectAuthDetail.as_view()),
] 