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
    author = models.ForeignKey(User, related_name='ticket_author',  null=True ,on_delete=models.SET_NULL)
    assigned_to = models.ManyToManyField(User, related_name='assigned_to')
    title = models.CharField(max_length=40)
    description = models.TextField(max_length=1250)
    is_completed = models.BooleanField(default=False)
    date_time_created = models.DateTimeField(default=now, editable=False)
    date_time_resolved = models.DateTimeField(blank=True, null=True)
    priority = models.ForeignKey(Priority,  null=True , on_delete=models.SET_NULL)
    type = models.ForeignKey(Type,  null=True ,on_delete=models.SET_NULL)

