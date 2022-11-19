import React, { useState } from "react";

const CrudButtons = (props) => {
  return (
    <button
      type="button"
      data-modal-toggle="product-modal"
      className={`text-white min-w-full bg-${props.info.color}-500 hover:bg-${props.info.color}-600 focus:ring-4 focus:ring-${props.info.color}-300 font-medium rounded-lg text-sm inline-flex items-center justify-center px-3 py-2 text-center`}
    >
      {props.info.icon}
      {props.info.title}
    </button>
  );
};

export default CrudButtons;
