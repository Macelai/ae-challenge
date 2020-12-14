import React, { useState } from "react";
import Card from "./components/Card";
import { API_URL } from "./Endpoints";
import { Endpoints } from "./Endpoints";
import "./index.css";

function App() {
  const [business, setBusiness] = useState({
    business_name: "",
    initial_date: "",
    number_of_locations: 0,
    title: "",
  });
  const [isLoading, setLoading] = useState(false);

  function getOldestLocation() {
    setBusiness({
      business_name: "",
      initial_date: "",
      number_of_locations: 0,
      title: "Business With Oldest Location",
    });
    setLoading(true);
    fetch(`${API_URL}/${Endpoints.BusinessOldestLocation}`)
      .then((res) => res.json())
      .then((res) =>
        setBusiness({ ...res, title: "Business With Oldest Location" })
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function getBusinessMostLocation() {
    setBusiness({
      business_name: "",
      initial_date: "",
      number_of_locations: 0,
      title: "Business With Oldest Location",
    });
    setLoading(true);
    fetch(`${API_URL}/${Endpoints.BusinessMostLocation}`)
      .then((res) => res.json())
      .then((res) =>
        setBusiness({ ...res, title: "Business With Most Location" })
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
              <Card {...business} />
            </div>
          </div>
        </div>
        <div className="flow-root">
          <div className="my-4">
            <button className="btn-primary mr-8" onClick={getOldestLocation}>
              Get Oldest Location
            </button>
            <button className="btn-primary" onClick={getBusinessMostLocation}>
              Get Most Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
