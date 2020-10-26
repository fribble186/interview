from django.urls import path
from interview import views

urlpatterns = [
    path('middle_register/', views.MiddleRegister.as_view()),
    path('middle_login/', views.MiddleLogin.as_view()),
    path('wx_login/', views.AuthView.as_view()),
    path('tests/', views.Tests.as_view()),
    path('tests_no_auth/', views.TestsNoAuth.as_view()),
    path('problem_box/', views.ProblemBox.as_view()),
    path('job_fairs/', views.JobFairs.as_view()),
    path('attend_job_fairs/', views.AttendJobFairs.as_view()),
    path('bat_upload_student/', views.BatUploadStudent.as_view()),
    path('test_box/', views.TestBox.as_view()),
    path('binding/', views.Binding.as_view()),
]