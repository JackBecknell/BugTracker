from rest_framework import serializers
from authentication.models import User
from .models import Project
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'date_created', 'team', 'project_author', 'project_author_id']

    project_author_id = serializers.IntegerField(write_only=True)