# Generated by Django 3.0.4 on 2020-06-07 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interview', '0006_auto_20200607_1609'),
    ]

    operations = [
        migrations.AddField(
            model_name='testbox',
            name='selectionScore',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
