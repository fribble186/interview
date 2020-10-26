from django.db import models


class Portfolio(models.Model):
    """
    照片集
    """
    name = models.CharField(max_length=50, null=True, blank=True)
    desc = models.CharField(max_length=200, null=True, blank=True)
    cover = models.CharField(max_length=200, null=True, blank=True)
    type = models.IntegerField(null=True, blank=True)


class Photo(models.Model):
    """
    照片
    """
    Portfolio = models.ForeignKey(
        Portfolio,
        related_name='photo_portfolio',
        on_delete=models.CASCADE
    )  # 属于哪个照片集
    desc = models.CharField(max_length=200, null=True, blank=True)
    source = models.CharField(max_length=200, null=True, blank=True)
