from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from projects.models import Project
from .serializers import ProjectSerializer
from authentication.models import User

# Create your views here.
