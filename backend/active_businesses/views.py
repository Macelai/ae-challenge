from rest_framework.decorators import api_view
from rest_framework.response import Response

from .service import (get_business_with_most_location,
                      get_business_with_oldest_location)


@api_view(["GET"])
def business_most_location(request):
    """
    Returns the business name and number of locations of the business
    with most locations from LA API
    """
    business_name, number_of_locations = get_business_with_most_location()
    return Response(
        {
            "business_name": business_name,
            "number_of_locations": number_of_locations,
        }
    )


@api_view(["GET"])
def oldest_location(request):
    """
    Returns the business name and start date of the oldest business from LA API
    """
    business_name, initial_date = get_business_with_oldest_location()
    return Response(
        {
            "business_name": business_name,
            "initial_date": initial_date.isoformat(),
        }
    )
