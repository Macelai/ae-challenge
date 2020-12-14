import { API_URL, Endpoints } from "../Endpoints";
import { BusinessType } from "../interfaces/types";

export async function fetchBusinessOldestLocation(): Promise<BusinessType> {
  const response = await fetch(
    `${API_URL}/${Endpoints.BusinessOldestLocation}`
  );
  const businessOldestLocation = await response.json();
  return businessOldestLocation;
}

export async function fetchBusinessMostLocation(): Promise<BusinessType> {
  const response = await fetch(`${API_URL}/${Endpoints.BusinessMostLocation}`);
  const businessOldestLocation = await response.json();
  return businessOldestLocation;
}
