# Generated by Django 3.0.4 on 2020-06-19 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interview', '0012_auto_20200610_1413'),
    ]

    operations = [
        migrations.AddField(
            model_name='testbox',
            name='duration',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='testbox',
            name='quit_time',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
