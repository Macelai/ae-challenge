import React from "react";
import { BusinessType } from "./interfaces/types";

function Card(props: BusinessType) {
  return props.business_name ? (
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
            value={props.business_name}
            disabled
          ></input>
        </label>
        {props.initial_date ? (
          <label className="block">
            <span className="text-gray-700">Date</span>
            <input
              type="text"
              className="input-primary"
              value={props.initial_date}
              disabled
            ></input>
          </label>
        ) : null}
        {props.number_of_locations ? (
          <label className="block">
            <span className="text-gray-700">Number</span>
            <input
              type="text"
              className="input-primary"
              value={props.number_of_locations}
              disabled
            ></input>
          </label>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default Card;
