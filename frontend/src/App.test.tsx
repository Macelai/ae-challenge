import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("with fetch mocked for success", () => {
  beforeEach(() => {
    const responseFromApi = {
      business_name: "AEstudio",
      initial_date: "2020",
      number_of_locations: 2,
    };
    const response = new Response(JSON.stringify(responseFromApi), {
      status: 200,
    });
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(Promise.resolve(response));
    render(<App />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("click get oldest location", async () => {
    await clickOldestLocation();
    const inputElement = screen.getByDisplayValue(/AEstudio/i);
    expect(inputElement).toBeDefined();
  });

  test("click get business with most location", async () => {
    await clickMostLocation();
    const inputElement = screen.getByDisplayValue(/AEstudio/i);
    expect(inputElement).toBeDefined();
  });
});
describe("with fetch mocked for error", () => {
  beforeEach(() => {
    const responseFromApi = {};
    const response = new Response(JSON.stringify(responseFromApi), {
      status: 503,
      statusText: "service unavailable",
    });
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(Promise.resolve(response));
    render(<App />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("click get oldest location and show error", async () => {
    await clickOldestLocation();
    const inputElement = screen.getByText("service unavailable");
    expect(inputElement).toBeDefined();
  });

  test("click get business with most location and show error", async () => {
    await clickMostLocation();
    const inputElement = screen.getByText("service unavailable");
    expect(inputElement).toBeDefined();
  });
});

async function clickMostLocation() {
  const linkElement = screen.getByText("Get Most Location");
  await waitFor(() => linkElement.click());
}

async function clickOldestLocation() {
  const linkElement = screen.getByText("Get Oldest Location");
  await waitFor(() => linkElement.click());
}
