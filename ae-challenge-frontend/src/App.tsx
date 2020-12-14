import React, { useState } from "react";
import Card from "./Card";
import { API_URL } from "./Endpoints";
import { Endpoints } from "./Endpoints";
import "./index.css";

function App() {
  const [oldestLocation, setOldestLocation] = useState({
    business_name: "",
    initial_date: "",
  });
  const [mostLocation, setBusinessMostLocation] = useState({
    business_name: "",
    number_of_locations: 0,
  });
  const [isLoading, setLoading] = useState(false);

  function getOldestLocation() {
    setLoading(true);
    fetch(`${API_URL}/${Endpoints.BusinessOldestLocation}`)
      .then((res) => res.json())
      .then((res) => setOldestLocation(res))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function getBusinessMostLocation() {
    setLoading(true);
    fetch(`${API_URL}/${Endpoints.BusinessMostLocation}`)
      .then((res) => res.json())
      .then((res) => setBusinessMostLocation(res))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <div className="page center">
      <div className="space-y-4">
        <div className="flow-root">
          {isLoading ? (
            <div className="center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : null}
          <div className="my-3">
            <div className="mx-10 pt-15">
              <Card {...oldestLocation} />
            </div>
          </div>
          <div className="my-3 center">
            <div className="mx-10 pt-15">
              <Card {...mostLocation} />
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
