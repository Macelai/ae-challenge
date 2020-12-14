from rest_framework.decorators import api_view
from rest_framework.response import Response

from .service import (get_business_with_most_location,
                      get_business_with_oldest_location)


@api_view(["GET"])
def business_most_location(request):
    key, value = get_business_with_most_location()
    return Response({"business_name": key, "number_of_locations": value})


@api_view(["GET"])
def oldest_location(request):
    business, oldest = get_business_with_oldest_location()
    return Response(
        {
            "business_name": business["business_name"],
            "initial_date": oldest.isoformat(),
        }
    )
