from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase

PASSWORD = "easy-password"


def create_user(username="tester", email="tester@mail.com", password=PASSWORD):
    user = get_user_model().objects.create_user(
        username=username, email=email, password=password
    )
    user.save()
    return user


class UserTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.registerUrl = "/api/users"
        self.loginUrl = "/api/users/login"

    def test_user_registration(self):
        response = self.client.post(
            reverse("authentication:register"),
            data={
                "user": {
                    "username": "tester",
                    "email": "tester@mail.com",
                    "password": PASSWORD,
                }
            },
            format="json",
        )
        user = get_user_model().objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], user.username)
        self.assertEqual(response.data["email"], user.email)
        self.assertEqual(response.data["token"], user.token)

    def test_user_login(self):
        user = create_user()
        self.client.login()
        data = {
            "user": {
                "username": user.username,
                "email": user.email,
                "password": PASSWORD,
            }
        }
        response = self.client.post(
            reverse("authentication:login"), data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], user.username)
        self.assertEqual(response.data["email"], user.email)
        self.assertEqual(response.data["token"], user.token)
