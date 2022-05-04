from django.urls import path
from . import views

urlpatterns = [
    path('', views.TicketList.as_view()),
    path('<int:ticket_id>/', views.TicketDetail.as_view()),
]