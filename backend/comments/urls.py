from django.urls import path
from . import views

urlpatterns = [
    path('<int:ticket_id>/', views.CommentAuthList.as_view()),
    path('postComment/', views.CommentAuthDetail.as_view()),
    path('deleteComment/<int:comment_id>/', views.CommentAuthDetail.as_view()),
]