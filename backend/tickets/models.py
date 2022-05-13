from django.db import models
from authentication.models import User
from projects.models import Project
from django.utils.timezone import now
import datetime
# Create your models here.

# models for 'Type' and 'Priority' have their own tables and are their own model but work and act
# as sub-classes for ticket which is why they do not have their own app.
class Type(models.Model):
    title = models.CharField(max_length=25)
    is_bug = models.BooleanField(default=True)
class Priority(models.Model):
    title = models.CharField(max_length=25)
class Ticket(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name='ticket_author',  null=True ,on_delete=models.SET_NULL)
    assigned_to = models.ManyToManyField(User, related_name='assigned_to')
    title = models.CharField(max_length=40)
    description = models.TextField(max_length=1250)
    is_completed = models.BooleanField(default=False)
    date_created = models.DateField(default=datetime.date.today, editable=False)
    priority = models.ForeignKey(Priority,  null=True , on_delete=models.SET_NULL)
    type = models.ForeignKey(Type,  null=True ,on_delete=models.SET_NULL)

