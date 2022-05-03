from django.db import models
from authentication.models import User
from django.utils.timezone import now
# Create your models here.
class Project(models.Model):
    project_author = models.ForeignKey(User, related_name='project_author', on_delete=models.SET_NULL)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    date_created = models.DateField(default=now, editable=False)
    date_time_resolved = models.DateTimeField(null=True)
    is_completed = models.BooleanField(default=False)
    team = models.ManyToManyField(User, related_name='team', null=True)
