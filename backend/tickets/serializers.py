from rest_framework import serializers
from authentication.models import User
from .models import *

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['id', 'title', 'is_bug']

class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ['id', 'title']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'assigned_to', 'title', 'description',
        'is_completed', 'date_time_created', 'date_time_resolved',
        'project', 'project_id', 'author', 'author_id', 'priority', 
        'priority_id', 'type', 'type_id']
    project_id = serializers.IntegerField(write_only=True)
    author_id = serializers.IntegerField(write_only=True)
    priority_id = serializers.IntegerField(write_only=True)
    type_id = serializers.IntegerField(write_only=True)