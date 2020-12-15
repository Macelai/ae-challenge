import React, { useState } from "react";
import Card from "./components/Card";
import "./index.css";
import { BusinessType } from "./interfaces/types";
import {
  fetchBusinessMostLocation,
  fetchBusinessOldestLocation,
} from "./services/service";

function App() {
  const emptyState = {
    businessName: "",
    initialDate: "",
    numberOfLocations: 0,
  };
  const [business, setBusiness] = useState(emptyState);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  function resetBusiness() {
    setBusiness(emptyState);
  }

  async function fetchBusiness(
    fetchData: () => Promise<BusinessType>,
    title: string
  ) {
    resetBusiness();
    setLoading(true);
    const business = await fetchData();
    setBusiness(business);
    setTitle(title);
    setLoading(false);
  }

  return (
    <div className="page center">
      <div className="space-y-4">
        <div className="flow-root">
          {isLoading && (
            <div className="center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          )}
          <div className="my-3">
            <div className="mx-10 pt-15">
              <Card {...business} title={title} />
            </div>
          </div>
        </div>
        <div className="flow-root">
          <div className="my-4">
            <button
              className="btn-primary mr-8"
              onClick={() =>
                fetchBusiness(
                  fetchBusinessOldestLocation,
                  "Business With Oldest Location"
                )
              }
            >
              Get Oldest Location
            </button>
            <button
              className="btn-primary"
              onClick={() =>
                fetchBusiness(
                  fetchBusinessMostLocation,
                  "Business With Most Location"
                )
              }
            >
              Get Most Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
