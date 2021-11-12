import React from "react";

const UnauthorizedAlert = () => {
  return (
    <div className="w-screen h-full flex justify-center items-center">
      <div className="w-2/5 bg-primary text-gray-100 text-3xl flex justify-center items-center rounded-xl p-5 text-center">
        <span>
          You are <b>not authorized</b>, in a seconds we're gonna redirect you
          to the main page. 😋
        </span>
      </div>
    </div>
  );
};

export default UnauthorizedAlert;
