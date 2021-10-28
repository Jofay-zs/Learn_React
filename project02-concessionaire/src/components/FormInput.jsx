import React from "react";

const FormInput = ({htmlFor, description, type, placeholder, inputName}) => {
  return (
    <div>
      <label className="font-bold" htmlFor={htmlFor}>
        {description}
        <input
          className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-myRed py-2 px-4 text-gray-800"
          type={type}
          placeholder={placeholder} 
          name={inputName}
          required
        />
      </label>
    </div>
  );
};

export default FormInput;
