from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .exceptions import ServiceUnavailable
from .service import (LA_CITY_BUSINESSES_API,
                      get_business_with_most_location,
                      get_business_with_oldest_location)


class TestActiveBusinesses(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_business_with_most_location(self):
        response = self.client.get(reverse("business_most_location"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], "SP PLUS CORPORATION")
        self.assertEqual(response.data["number_of_locations"], 74)

    def test_get_oldest_business(self):
        response = self.client.get(reverse("oldest_location"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], "ABILITYFIRST")
        self.assertEqual(response.data["initial_date"], "1943-08-09T00:00:00")

    def test_should_fetch_third_party_api_most_location(self):
        with patch(
            "active_businesses.service.requests.Session.get"
        ) as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = [
                {"business_name": "test", "number_of_locations": 1}
            ]
            get_business_with_most_location()
            mock_get.assert_called_with(LA_CITY_BUSINESSES_API, timeout=10)

    def test_should_fetch_third_party_api_oldest_location(self):
        with patch(
            "active_businesses.service.requests.Session.get"
        ) as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = [
                {
                    "business_name": "test",
                    "location_start_date": "1991-05-15T00:00:00.000",
                }
            ]
            get_business_with_oldest_location()
            mock_get.assert_called_with(LA_CITY_BUSINESSES_API, timeout=10)

    def test_should_raise_exception_business_most_location(self):
        with patch(
            "active_businesses.service.requests.Session.get"
        ) as mock_get:
            mock_get.return_value.status_code = 500
            self.assertRaises(
                ServiceUnavailable, get_business_with_most_location
            )

    def test_should_raise_exception_oldest_location(self):
        with patch(
            "active_businesses.service.requests.Session.get"
        ) as mock_get:
            mock_get.return_value.status_code = 500
            self.assertRaises(
                ServiceUnavailable, get_business_with_oldest_location
            )
