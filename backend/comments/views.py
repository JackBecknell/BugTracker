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

    def get(self, request):
        comments = Comments.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)