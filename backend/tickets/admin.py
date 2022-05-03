from django.contrib import admin
from .models import *
# Register your models here.
ticket_models = [Ticket, Type, Priority]
admin.site.register(ticket_models)
