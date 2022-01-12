from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("commune.apps.articles.urls", namespace="articles")),
    path(
        "api/", include("commune.apps.authentication.urls", namespace="authentication")
    ),
    path("api/", include("commune.apps.profiles.urls", namespace="profiles")),
]
