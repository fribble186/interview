# Generated by Django 3.0.4 on 2020-06-07 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interview', '0004_problem_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='selection',
            name='contents',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
