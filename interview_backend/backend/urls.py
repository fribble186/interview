from django.urls import path, include

urlpatterns = [
    path('api/', include('interview.urls')),
    path('api/exhibition/', include('exhibition.urls')),
]