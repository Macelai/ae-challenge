import React, { useState } from "react";
import "./index.css";

function App() {
  const [oldestLocation, setOldestLocation] = useState({
    business: "",
    date: "",
  });
  const [mostLocation, setBusinessMostLocation] = useState({
    business: "",
    value: "",
  });

  const getOldestLocation = () => {
    fetch(`http://127.0.0.1:8000/api/oldest_location`)
      .then((res) => res.json())
      .then((res) => {
        setOldestLocation(res);
      })
      .catch((error) => console.log(error));
  };

  const getBusinessMostLocation = () => {
    fetch(`http://127.0.0.1:8000/api/business_most_location`)
      .then((res) => res.json())
      .then((res) => {
        setBusinessMostLocation(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="page center">
      <div className="space-y-4">
        <div className="flow-root">
          <div className="my-4 center">
            <div className="mx-10 pt-15">
              <div className="grid gap-6 mb-8 md:grid-cols-2 center">
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                    {oldestLocation.business}
                    {mostLocation.business} <br></br>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {oldestLocation.date}
                    {mostLocation.value}
                  </p>
                </div>
              </div>
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
