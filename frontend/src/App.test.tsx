import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "./App";

beforeEach(() => {
  const responseFromApi = {
    business_name: "AEstudio",
    initial_date: "2020",
    number_of_locations: 2,
  };
  const response = new Response(JSON.stringify(responseFromApi), {
    status: 200,
  });
  jest.spyOn(global, "fetch").mockResolvedValueOnce(Promise.resolve(response));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("click get oldest location", async () => {
  render(<App />);
  const linkElement = screen.getByText("Get Oldest Location");
  await waitFor(() => linkElement.click());
  const inputElement = screen.getByDisplayValue(/AEstudio/i);
  expect(inputElement).toBeDefined();
});

test("click get business with most location", async () => {
  render(<App />);
  const linkElement = screen.getByText("Get Most Location");
  await waitFor(() => linkElement.click());
  const inputElement = screen.getByDisplayValue(/AEstudio/i);
  expect(inputElement).toBeDefined();
});
