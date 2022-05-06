from django.urls import path
from . import views

urlpatterns = [
    path('', views.TicketAuthList.as_view()),
    path('<int:ticket_id>/', views.TicketAuthDetail.as_view()),
    path('post/', views.TicketAuthDetail.as_view()),
    path('assign/<int:ticket_id>/', views.TicketAuthAddAssigned.as_view()),
    path('unassign/<int:ticket_id>/', views.TicketAuthRemovAssigned.as_view()),
    path('list/<int:project_id>/', views.TicketAuthListByProjectId.as_view())
]