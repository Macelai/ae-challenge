from django.urls import include, path

urlpatterns = [
    path("", include("active_businesses.urls")),
]
