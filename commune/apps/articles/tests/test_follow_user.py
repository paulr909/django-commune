from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

PASSWORD = "easy-password"


def create_user(username="tester", email="tester@mail.com", password=PASSWORD):
    user = get_user_model().objects.create_user(
        username=username, email=email, password=password
    )
    user.save()
    return user


def create_user2(username="jenny", email="jenny@mail.com", password=PASSWORD):
    user2 = get_user_model().objects.create_user(
        username=username, email=email, password=password
    )
    user2.save()
    return user2


class FollowUserTestCase(APITestCase):
    follow_url = "/api/profiles/jenny/follow"

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        self.user2 = create_user2()

    def test_user_can_follow_other_user(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {0}".format(self.user.token))
        response = self.client.post(
            self.follow_url,
            data={
                "profile": {
                    "username": "jenny",
                    "bio": "",
                    "image": "",
                    "following": True,
                }
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            {"username": "jenny", "bio": "", "image": "", "following": True},
        )

    def test_user_can_unfollow_other_user(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {0}".format(self.user.token))
        response = self.client.delete(
            self.follow_url,
            data={
                "profile": {
                    "username": "jenny",
                    "bio": "",
                    "image": "",
                    "following": False,
                }
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {"username": "jenny", "bio": "", "image": "", "following": False},
        )
