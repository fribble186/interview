from rest_framework.serializers import ModelSerializer, SerializerMethodField
from exhibition import models


class BasicPortfolioSerializer(ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = '__all__'


class PhotoSerializer(ModelSerializer):
    class Meta:
        model = models.Photo
        fields = '__all__'


class DetailPortfolioSerializer(ModelSerializer):
    photo_portfolio = SerializerMethodField(source='get_photo_portfolio')

    class Meta:
        model = models.Portfolio
        fields = (
            'photo_portfolio',
            'name',
            'desc',
        )

    @staticmethod
    def get_photo_portfolio(obj):
        return PhotoSerializer(obj.photo_portfolio, many=True).data
