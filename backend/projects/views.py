# Third party imports
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated

# My Imports
from .models import Project
from .serializers import ProjectSerializer
from authentication.models import User
class ProjectAuthList(APIView, IsAuthenticated):

    #Returns a list of all projects
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data) 

class ProjectAuthDetail(APIView, IsAuthenticated):

    #helper function to return project by id
    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    #gets project by pk
    def get(self, request, project_id):
        project = self.get_object(project_id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #function takes user input data and creates a project if it is valid.       
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)

    #delete project by pk
    def delete(self, request , project_id):
        project = self.get_object(project_id)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # updates project by pk
    def put(self, request, project_id):
        project = self.get_object(project_id)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Both endpoints below are unused by the front end by have full functionality in the backend.
class ProjectAuthAddTeam(APIView, IsAuthenticated):
    def put(self, request, project_id):
        project = Project.objects.get(id=project_id)
        for i in request.data["user_ids"]:
            project.team.add(User.objects.get(id=i))
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

class ProjectAuthRemovTeam(APIView, IsAuthenticated):
    def put(self, request, project_id):
        project = Project.objects.get(id=project_id)
        for i in request.data["user_ids"]:
            project.team.remove(User.objects.get(id=i))
        serializer = ProjectSerializer(project)
        return Response(serializer.data)