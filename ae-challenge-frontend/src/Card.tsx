import React from "react";
import { BusinessType } from "./interfaces/types";

function Card(props: BusinessType) {
  return props.business_name ? (
    <div className="grid gap-6 mb-8 md:grid-cols-2 center">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
          {props.business_name}
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          {props.initial_date}
          {props.number_of_locations}
        </p>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Card;
