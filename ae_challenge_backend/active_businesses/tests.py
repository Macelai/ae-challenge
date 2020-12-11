from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class TestActiveBusinesses(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_business_with_most_location(self):
        response = self.client.get(reverse("business_most_location"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business"], "SP PLUS CORPORATION")
        self.assertEqual(response.data["value"], 74)

    def test_get_oldest_business(self):
        response = self.client.get(reverse("oldest_location"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business"], "ABILITYFIRST")
        self.assertEqual(response.data["date"], "1943-08-09T00:00:00")
