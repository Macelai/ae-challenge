from typing import Dict, Tuple

from rest_framework.decorators import api_view
from rest_framework.response import Response
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


def _maximum_keys(business_to_occurrence: Dict[str, int]) -> Tuple:
    max_value = max(business_to_occurrence.values())
    keys = next(
        filter(
            lambda x: business_to_occurrence[x] == max_value,
            business_to_occurrence.keys(),
        )
    )
    return keys, max_value
