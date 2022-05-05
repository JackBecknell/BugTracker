from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import TicketSerializer
from authentication.models import User


class TicketAuthList(APIView, IsAuthenticated):
    #Returns a list of all projects
    def get(self, request):
        tickets = Ticket.objects.all()
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)


class TicketAuthDetail(APIView, IsAuthenticated):

 #helper function to return ticket by id
    def get_object(self, pk):
        try:
            return Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, ticket_id):
        ticket = self.get_object(ticket_id)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #function takes user input data and creates a ticket if it is valid.       
    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)

    def delete(self, request , ticket_id):
        ticket = self.get_object(ticket_id)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, ticket_id):
        ticket = self.get_object(ticket_id)
        serializer = TicketSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)