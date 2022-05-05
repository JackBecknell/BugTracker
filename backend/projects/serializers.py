from asyncore import read
from rest_framework import serializers
from authentication.models import User
from .models import Project
#All references to team will be kept for future incorporation
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
class ProjectSerializer(serializers.ModelSerializer):
    project_author = UserSerializer(read_only=True)
    team = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'date_created', 'date_time_resolved', 'is_completed', 'team', 'project_author', 'project_author_id']
        depth = 1
    project_author_id = serializers.IntegerField(write_only=True)

 