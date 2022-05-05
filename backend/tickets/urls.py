from django.urls import path
from . import views

urlpatterns = [
    path('', views.TicketAuthList.as_view()),
    path('<int:ticket_id>/', views.TicketAuthDetail.as_view()),
    path('post/', views.TicketAuthDetail.as_view()),
]