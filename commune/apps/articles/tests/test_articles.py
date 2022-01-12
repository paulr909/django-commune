from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ..models import Article

PASSWORD = "easy-password"


def create_user(username="tester", email="tester@mail.com", password=PASSWORD):
    user = get_user_model().objects.create_user(
        username=username, email=email, password=password
    )
    user.save()
    return user


class ArticlesTestCase(APITestCase):
    url = "/api/articles"
    author_url = "/api/articles?author=tester&limit=5&offset=0"

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()

    def test_user_can_create_article(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {0}".format(self.user.token))
        response = self.client.post(
            self.url,
            data={
                "article": {
                    "title": "Test project",
                    "description": "Test this project",
                    "body": "Running tests to allow some peace of mind...",
                }
            },
            format="json",
        )
        article = Article.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], article.title)
        self.assertEqual(response.data["description"], article.description)
        self.assertEqual(response.data["body"], article.body)

    def test_user_incorrect_token(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token {0}".format(
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNTcyNzY1MzgwfQ."
                "-5dU550dQKJqWOcYgcGGwF2kcTYxdoAlVenav0-JECo"
            )
        )
        response = self.client.post(
            self.url,
            data={
                "article": {
                    "title": "Test project",
                    "description": "Test this project",
                    "body": "Running tests to allow some peace of mind...",
                }
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_get_articles(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_get_author(self):
        response = self.client.get(self.author_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
