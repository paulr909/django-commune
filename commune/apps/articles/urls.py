from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ArticlesFavoriteAPIView,
    ArticlesFeedAPIView,
    ArticleViewSet,
    CommentsDestroyAPIView,
    CommentsListCreateAPIView,
    TagListAPIView,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"articles", ArticleViewSet)

app_name = "articles"


urlpatterns = [
    path("", include(router.urls)),
    path("articles/feed", ArticlesFeedAPIView.as_view()),
    path("articles/<str:article_slug>/favorite", ArticlesFavoriteAPIView.as_view()),
    path("articles/<str:article_slug>/comments", CommentsListCreateAPIView.as_view()),
    path(
        "articles/<str:article_slug>/comments/<int:comment_pk>",
        CommentsDestroyAPIView.as_view(),
    ),
    path("tags", TagListAPIView.as_view()),
]
