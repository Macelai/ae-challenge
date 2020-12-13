from django.urls import path

from . import views

urlpatterns = [
    path(
        "api/business_most_location",
        views.business_most_location,
        name="business_most_location",
    ),
    path(
        "api/oldest_location",
        views.oldest_location,
        name="oldest_location",
    ),
]
