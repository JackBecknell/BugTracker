from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Comments
from .serializers import CommentSerializer
# Create your views here.
class CommentAuthList(APIView, IsAuthenticated):

    def get(self, request, ticket_id):
        comments = Comments.objects.filter(ticket_id=ticket_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
class CommentAuthDetail(APIView, IsAuthenticated):
    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    
    def delete(self, request , comment_id):
        comment = Comments.objects.get(id=comment_id)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)