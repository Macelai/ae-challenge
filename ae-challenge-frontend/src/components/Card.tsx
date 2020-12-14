import React from "react";
import { BusinessType } from "../interfaces/types";

function Card(props: BusinessType & { title: string }) {
  if (!props.businessName) {
    return <div></div>;
  }
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 center">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300 center">
          {props.title}
        </h4>
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            className="input-primary"
            value={props.businessName}
            disabled
          ></input>
        </label>
        {props.initialDate && (
          <label className="block">
            <span className="text-gray-700">Date</span>
            <input
              type="text"
              className="input-primary"
              value={props.initialDate}
              disabled
            ></input>
          </label>
        )}
        {props.numberOfLocations && (
          <label className="block">
            <span className="text-gray-700">Number</span>
            <input
              type="text"
              className="input-primary"
              value={props.numberOfLocations}
              disabled
            ></input>
          </label>
        )}
      </div>
    </div>
  );
}

export default Card;
