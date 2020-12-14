from datetime import datetime
from typing import Dict, Tuple

import requests
from django.conf import settings
from requests import Response

from .exceptions import ServiceUnavailable


def get_business_with_most_location() -> Tuple:
    response = _fetch_businesses_from_la_api()
    business_to_number_of_location = dict()
    if response.status_code == 200:
        businesses_list = response.json()
        for active_business in businesses_list:
            business_name = active_business["business_name"]
            if business_name not in business_to_number_of_location:
                business_to_number_of_location[business_name] = 1
            else:
                business_to_number_of_location[business_name] += 1
        business, value = _get_max_business_occurrence(
            business_to_number_of_location
        )
    else:
        raise ServiceUnavailable()
    return business, value


def get_business_with_oldest_location() -> Tuple:
    response = _fetch_businesses_from_la_api()
    oldest_datetime = datetime.utcnow()
    business = ""
    if response.status_code == 200:
        businesses_list = response.json()
        for active_business in businesses_list:
            if "location_start_date" in active_business:
                location_start_date = active_business["location_start_date"]
                start_date_as_datetime = datetime.strptime(
                    location_start_date,
                    "%Y-%m-%dT%H:%M:%S.%f",
                )
                if start_date_as_datetime < oldest_datetime:
                    oldest_datetime = start_date_as_datetime
                    business = active_business
    else:
        raise ServiceUnavailable()
    return business, oldest_datetime


def _fetch_businesses_from_la_api() -> Response:
    session = requests.Session()
    session.headers.update(
        {
            "X-app-token": settings.DATA_LACITY_APP_TOKEN,
            "Content-type": "application/json",
        }
    )
    response = session.get(settings.LA_CITY_BUSINESSES_API, timeout=10)
    return response


def _get_max_business_occurrence(
    business_to_occurrence: Dict[str, int]
) -> Tuple:
    max_value = max(business_to_occurrence.values())
    business = next(
        filter(
            lambda k: business_to_occurrence[k] == max_value,
            business_to_occurrence.keys(),
        )
    )
    return business, max_value
