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
        model = Ticket
        fields = ['id', 'title']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    ticket = TicketSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = ['id', 'user', 'user_id', 'ticket', 'ticket_id', 'text']
        depth = 1
    user_id = serializers.IntegerField(write_only=True)
    ticket_id = serializers.IntegerField(write_only=True)