from django.db import models
from authentication.models import User
from django.utils.timezone import now
import datetime
# Create your models here.
class Project(models.Model):
    project_author = models.ForeignKey(User, related_name='project_author', null=True ,on_delete=models.SET_NULL)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=1250)
    date_created = models.DateField(default=datetime.date.today, editable=False)
    is_completed = models.BooleanField(default=False)
    team = models.ManyToManyField(User, related_name='team')
    # ^^^ team field is currently unused but fully functional.