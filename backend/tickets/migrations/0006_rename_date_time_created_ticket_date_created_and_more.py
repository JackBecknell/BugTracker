# Generated by Django 4.0.4 on 2022-05-12 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0005_rename_date_created_ticket_date_time_created'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='date_time_created',
            new_name='date_created',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='date_time_resolved',
        ),
    ]
