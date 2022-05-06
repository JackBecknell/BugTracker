from django.db import models
from authentication.models import User
from tickets.models import Ticket
# Create your models here.
class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)


    