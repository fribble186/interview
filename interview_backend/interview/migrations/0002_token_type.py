# Generated by Django 3.0.4 on 2020-06-07 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interview', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='token',
            name='type',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]