import React, { useEffect, useState } from "react";
import "styles/cars.css";

// Make a form that asks the user for the age and displays a message that says if the user is older or not

const vehiclesList = [
  {
    ID: '01',
    Name: "Tesla X",
    Brand: "Tesla",
    Model: 2020,
    Color: "Black",
    Owner: "Will",
  },
  {
    ID: '02',
    Name: "Toyota 4 Runner",
    Brand: "Toyota",
    Model: 2019,
    Color: "Blue",
    Owner: "Juan",
  },
  {
    ID: '03',
    Name: "Mazda 3",
    Brand: "Mazda",
    Model: 2017,
    Color: "Orange",
    Owner: "Daniel",
  },
  {
    ID: '04',
    Name: "Volkswagen Tiguan",
    Brand: "Volkswagen",
    Model: 2018,
    Color: "Green",
    Owner: "Anie",
  },
  {
    ID:'05',
    Name:'Chevrolet Onix',
    Brand:'Chevrolet',
    Model:'2018',
    Color: 'Yellow',
    Owner: 'Mary',
  }
];

const Cars = () => {
  const [showTable, setShowTable] = useState(false);
  const [buttonText, setButtonText] = useState("Create new car");

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    // Geeting vehicles list from the Frontend
    setVehicles(vehiclesList);
  },[]);

  useEffect(() => {
    if (showTable) {
      setButtonText("Create new car");
    } else {
      setButtonText("Show all");
    }
  }, [showTable]);

  return (
    <div className="transparenth-full w-full">
      <div>
        <div className="flex justify-center items-center">
          <h2 className="font-extrabold text-2xl py-4 px-1">
            Vehicles managment
          </h2>
        </div>
        <div className="w-full h-full flex justify-center items-center mb-5 sm:block sm:p-5">
          <button
            onClick={() => {
              setShowTable(!showTable);
            }}
            className="font-bold text-xl bg-gradient-to-r text-gray-800 border-2 border-yellow-500  py-2 px-4 shadow rounded hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-gray-100"
          >
            {buttonText}
          </button>
        </div>
      </div>
      <div>{showTable ? <CarsTable carsList={vehicles}/> : <CarsForm />}</div>
    </div>
  );
};

const CarsTable = () => {
  useEffect(()=>{
    console.log("Cars List:", vehiclesList);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Look at all the vehicles
        </h2>
        <section className="overflow-x-auto py-3 min-w-11/12 max-h-96 w-full rounded-xl">
          <table className="text-gray-800 table-auto border-collapse border-4 border-yellow-500 bg-gray-50 overflow-y-scroll">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Color</td>
                <td>Owner</td>
              </tr>
            </thead>
            <tbody>

              {vehiclesList.map((vehicle)=>{
                return (
                  <tr>
                    <td>{vehicle.ID}</td>
                    <td>{vehicle.Name}</td>
                    <td>{vehicle.Brand}</td>
                    <td>{vehicle.Model}</td>
                    <td>{vehicle.Color}</td>
                    <td>{vehicle.Owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const CarsForm = ({carsList}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Create new car
        </h2>
      </div>
      <form
        action=""
        className="block w-screen py-5 px-7 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-20 lg:px-52 xl:px-72 2xl:px-96"
      >
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="ID"
          name="id"
        />
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="Brand"
          name="brand"
        />
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="Model"
          name="model"
        />
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="Color"
          name="color"
        />
        <input
          className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
          type="text"
          placeholder="Owner"
          name="owner"
        />
        <button className="font-bold mt-5 w-full col-span-2 p-2 bg-gradient-to-r text-gray-800 border border-yellow-500 shadow-md rounded-full hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-gray-100">
          Save car
        </button>
      </form>
    </div>
  );
};

export default Cars;
