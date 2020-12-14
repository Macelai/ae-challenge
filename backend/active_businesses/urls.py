from django.urls import path

from . import views

urlpatterns = [
    path(
        "api/v1/business/most_location",
        views.business_most_location,
        name="business_most_location",
    ),
    path(
        "api/v1/business/oldest",
        views.oldest_location,
        name="oldest_location",
    ),
]
