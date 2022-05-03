from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Ticket
from .serializers import TicketSerializer
from authentication.models import User


class TicketList(APIView, AllowAny):
    #Returns a list of all projects
    def get(self, request):
        tickets = Ticket.objects.all()
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)


class TicketDetail(APIView, AllowAny):

    def get(self, request, ticket_id):
        ticket = Ticket.objects.get(id = ticket_id)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)