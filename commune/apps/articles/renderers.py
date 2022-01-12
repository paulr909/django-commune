from commune.apps.core.renderers import CommuneJSONRenderer


class ArticleJSONRenderer(CommuneJSONRenderer):
    object_label = "article"
    pagination_object_label = "articles"
    pagination_count_label = "articlesCount"


class CommentJSONRenderer(CommuneJSONRenderer):
    object_label = "comment"
    pagination_object_label = "comments"
    pagination_count_label = "commentsCount"
