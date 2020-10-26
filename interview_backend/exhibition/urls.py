from django.urls import path
from exhibition import views

urlpatterns = [
    path('portfolio/', views.Portfolio.as_view()),
]