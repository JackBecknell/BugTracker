# Generated by Django 4.0.4 on 2022-05-03 20:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=255)),
                ('date_created', models.DateField(default=django.utils.timezone.now, editable=False)),
                ('date_time_resolved', models.DateTimeField(null=True)),
                ('is_completed', models.BooleanField(default=False)),
                ('project_author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='project_author', to=settings.AUTH_USER_MODEL)),
                ('team', models.ManyToManyField(null=True, related_name='team', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
