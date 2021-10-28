import React from "react";

const FormButton = ({ type, description }) => {
  return (
    <button
      type={type}
      className="font-bold mt-5 w-full col-span-2 p-2 border border-gray-200 shadow-md rounded-full hover:bg-myRed hover:text-gray-100"
    >
      {description}
    </button>
  );
};

export default FormButton;
