from django.db import models
from authentication.models import User
from projects.models import Project
from django.utils.timezone import now
# Create your models here.


class Type(models.Model):
    title = models.CharField(max_length=25)
    is_bug = models.BooleanField(default=True)
class Priority(models.Model):
    title = models.CharField(max_length=25)
class Ticket(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name='ticket_author', on_delete=models.SET_NULL)
    assigned_to = models.ManyToManyField(User, related_name='assigned_to', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    date_time_created = models.DateTimeField(default=now, editable=False)
    date_time_resolved = models.DateTimeField(null=True)
    priority = models.ForeignKey(Priority, on_delete=models.SET_NULL)
    type = models.ForeignKey(Type, on_delete=models.SET_NULL)

