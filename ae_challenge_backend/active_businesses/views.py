from typing import Dict, Tuple

from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
import requests


@api_view(["GET"])
def business_most_location(request):
    resquest = requests.get(
        "https://data.lacity.org/resource/6rrh-rzua.json", timeout=10
    )
    dict_res = dict()
    if resquest.status_code == 200:
        data = resquest.json()
        for active_business in data:
            if active_business["business_name"] not in dict_res:
                dict_res[active_business["business_name"]] = 1
            else:
                dict_res[active_business["business_name"]] += 1
        key, value = _maximum_keys(dict_res)
        return Response({"business": key, "value": value})
    else:
        return Response(status=500)


@api_view(["GET"])
def oldest_location(request):
    resquest = requests.get(
        "https://data.lacity.org/resource/6rrh-rzua.json", timeout=10
    )
    oldest = datetime.utcnow()
    if resquest.status_code == 200:
        data = resquest.json()
        for active_business in data:
            if "location_start_date" in active_business:
                datetime_object = datetime.strptime(
                    active_business["location_start_date"],
                    "%Y-%m-%dT%H:%M:%S.%f",
                )
                if datetime_object < oldest:
                    oldest = datetime_object
                    business = active_business
        return Response(
            {"business": business["business_name"], "date": oldest.isoformat()}
        )
    else:
        return Response(status=500)


def _maximum_keys(business_to_occurrence: Dict[str, int]) -> Tuple:
    max_value = max(business_to_occurrence.values())
    keys = next(
        filter(
            lambda x: business_to_occurrence[x] == max_value,
            business_to_occurrence.keys(),
        )
    )
    return keys, max_value
