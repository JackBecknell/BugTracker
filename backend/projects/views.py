from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from projects.models import Project
from .serializers import ProjectSerializer
from authentication.models import User


class ProjectList(APIView, AllowAny):
    #Returns a list of all projects
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
class ProjectDetail(APIView, AllowAny):

    def get(self, request, project_id):
        projects = Project.objects.filter(id = project_id)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
