# Generated by Django 4.0.4 on 2022-05-06 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0004_remove_ticket_date_time_created_ticket_date_created'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='date_created',
            new_name='date_time_created',
        ),
    ]