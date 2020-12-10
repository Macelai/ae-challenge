from django.urls import path, include

urlpatterns = [
    path("", include("active_businesses.urls")),
]
