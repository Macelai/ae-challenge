import camelcaseKeys from "camelcase-keys";
import { API_URL, Endpoints } from "../Endpoints";
import { BusinessType } from "../interfaces/types";

export async function fetchBusinessOldestLocation(): Promise<BusinessType> {
  const response = await fetch(
    `${API_URL}/${Endpoints.BusinessOldestLocation}`
  );
  if (response.status === 503) {
    throw response.statusText;
  }
  const businessOldestLocation = await response.json();
  return camelcaseKeys(businessOldestLocation);
}

export async function fetchBusinessMostLocation(): Promise<BusinessType> {
  const response = await fetch(`${API_URL}/${Endpoints.BusinessMostLocation}`);
  if (response.status === 503) {
    throw response.statusText;
  }
  const businessMostLocation = await response.json();
  return camelcaseKeys(businessMostLocation);
}
