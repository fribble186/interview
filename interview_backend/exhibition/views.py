from rest_framework.views import APIView
from exhibition import models, serializers
from rest_framework.response import Response
from rest_framework import status


class Portfolio(APIView):
    @staticmethod
    def get(request):
        """
        摄影集列表
        某个摄影集的照片列表
        """
        p_id = request.GET['p_id'] if 'p_id' in request.GET else None
        if p_id:
            portfolio_obj = models.Portfolio.objects.filter(id=p_id).first()
            portfolio_data = serializers.DetailPortfolioSerializer(portfolio_obj, many=False).data
            response = {"data": portfolio_data}
        else:
            portfolio_qs = models.Portfolio.objects.filter().all()
            portfolio_data = serializers.BasicPortfolioSerializer(portfolio_qs, many=True).data
            response = {"data": portfolio_data}
        return Response(response, status=status.HTTP_200_OK)

