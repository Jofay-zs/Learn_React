// import React, { useEffect, useState } from "react";

// Make a form that asks the user for the age and displays a message that says if the user is older or not

const Cars = () => {

  return (
    <div>
      <h2>Cars managment</h2>
      <button>
        Create new car
      </button>
      <CarsTable/>
    </div>
  );
};

const CarsTable = () => {
  return(
    <div>
      Cars Table
    </div>
  );
};

const CarsForm = () => {
  return <div>cars Form</div>;
};

export default Cars;
