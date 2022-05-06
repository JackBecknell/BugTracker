from rest_framework import serializers
from .models import Comments
from authentication.models import User
from tickets.models import Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'title']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = ['id', 'user', 'user_id', 'ticket', 'ticket_id', 'text']
    user_id = serializers.IntegerField(write_only=True)
    ticket_id = serializers.IntegerField(write_only=True)