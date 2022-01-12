from django.apps import AppConfig


class ArticlesAppConfig(AppConfig):
    name = "commune.apps.articles"
    label = "articles"
    verbose_name = "Articles"

    def ready(self):
        import commune.apps.articles.signals


default_app_config = "commune.apps.articles.ArticlesAppConfig"
