from django.urls import path
from . import views

urlpatterns = [
    path("api/business_most_location/", views.business_most_location),
]
