# Generated by Django 4.0.4 on 2022-05-03 20:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
                ('is_bug', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=255)),
                ('is_completed', models.BooleanField(default=False)),
                ('date_time_created', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('date_time_resolved', models.DateTimeField(null=True)),
                ('assigned_to', models.ManyToManyField(null=True, related_name='assigned_to', to=settings.AUTH_USER_MODEL)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ticket_author', to=settings.AUTH_USER_MODEL)),
                ('priority', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tickets.priority')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project')),
                ('type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tickets.type')),
            ],
        ),
    ]
