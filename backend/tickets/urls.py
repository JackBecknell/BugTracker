from django.urls import path
from . import views

urlpatterns = [
    path('<int:ticket_id>/', views.TicketDetail.as_view()),
]