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
    <div>
      <p className="text-sm font-medium text-purple-900">Successfully saved!</p>
      {oldestLocation.business} <br></br>
      {oldestLocation.date}
      <br></br>
      {mostLocation.business} <br></br>
      {mostLocation.value}
      <button onClick={getOldestLocation}>Get Oldest Location</button>
      <button onClick={getBusinessMostLocation}>
        Get Business With Most Location
      </button>
    </div>
  );
}

export default App;
