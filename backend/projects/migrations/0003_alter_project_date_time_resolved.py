# Generated by Django 4.0.4 on 2022-05-03 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_alter_project_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='date_time_resolved',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
