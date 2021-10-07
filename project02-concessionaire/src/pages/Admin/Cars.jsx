import React, { useEffect, useState } from "react";
import "styles/cars.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Make a form that asks the user for the age and displays a message that says if the user is older or not

const backendVehicles = [
  {
    ID: "01",
    name: "Tesla X",
    brand: "Tesla",
    model: 2020,
    color: "Black",
    owner: "Will",
  },
  {
    ID: "02",
    name: "Toyota 4 Runner",
    brand: "Toyota",
    model: 2019,
    color: "Blue",
    owner: "Juan",
  },
  {
    ID: "03",
    name: "Mazda 3",
    brand: "Mazda",
    model: 2017,
    color: "Orange",
    owner: "Daniel",
  },
  {
    ID: "04",
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    model: 2018,
    color: "Green",
    owner: "Anie",
  },
  {
    ID: "05",
    name: "Chevrolet Onix",
    brand: "Chevrolet",
    model: "2018",
    color: "Yellow",
    owner: "Mary",
  },
];

const Cars = () => {
  const [showTable, setShowTable] = useState(false);
  const [buttonText, setButtonText] = useState("Create new car");
  const [changeButtonColor, setChangeButtonColor] = useState("indigo");

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    // Geeting vehicles list from the Frontend
    setVehicles(backendVehicles);
  }, []);

  useEffect(() => {
    /**
     * If my const showTable is true the button in line 86, this is going to show the default text and color
     * but if it's false, it's going to change the text and color.
     *
     * Keep in mind that, when I press the button it will change the state, that
     */
    if (showTable) {
      setButtonText("Create new car");
      setChangeButtonColor(
        "hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600"
      );
    } else {
      setButtonText("Show all");
      setChangeButtonColor(
        "hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-400"
      );
    }
  }, [showTable]);

  return (
    <div className="h-full w-full">
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
            className={`font-bold text-xl bg-gradient-to-r text-gray-800 border border-yellow-500  py-2 px-4 shadow rounded ${changeButtonColor} hover:text-gray-100`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      {showTable ? (
        <CarsTable vehiclesList={vehicles} />
      ) : (
        <CarsForm
          functionToShowTable={setShowTable}
          vehiclesList={vehicles}
          addVehicle={setVehicles}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const CarsTable = ({ vehiclesList }) => {
  useEffect(() => {
    console.log("Cars List:", vehiclesList);
  }, [vehiclesList]);

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
              {vehiclesList.map((vehicle) => {
                return (
                  <tr>
                    <td>{vehicle.ID}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.color}</td>
                    <td>{vehicle.owner}</td>
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

const CarsForm = ({ functionToShowTable, vehiclesList, addVehicle }) => {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [owner, setOwner] = useState("");

  const CreateCar = () => {
    if (ID === "") {
      toast.error("ID is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (name === "") {
      toast.error("Name is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (brand === "") {
      toast.error("Brand is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (model === "") {
      toast.error("Model is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (color === "") {
      toast.error("Color is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (owner === "") {
      toast.error("Owner is a required field 😐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Vehicle added successfully 🦼", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      functionToShowTable(true);
      addVehicle([
        ...vehiclesList,
        {
          ID: ID,
          name: name,
          brand: brand,
          model: model,
          color: color,
          owner: owner,
        },
      ]);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Create new car
        </h2>
      </div>
      <form className="block w-screen py-5 px-7 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-20 lg:px-52 xl:px-72 2xl:px-96">
        <label className="font-bold" htmlFor="id">
          ID
          <input
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            type="number"
            placeholder="0001"
            name="id"
            min="1"
            value={ID}
            onChange={(e) => {
              setID(e.target.value);
            }}
            required="true"
          />
        </label>
        <label className="font-bold" htmlFor="name">
          Name
          <input
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            type="text"
            placeholder="Tesla model S"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </label>
        <label className="font-bold" htmlFor="brand">
          Brand
          <input
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            type="text"
            placeholder="Tesla"
            name="brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            required
          />
        </label>
        <label className="font-bold" htmlFor="model">
          Model
          <input
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            type="number"
            placeholder="2020"
            name="model"
            min="1950"
            max="2022"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
            required
          />
        </label>
        <label className="font-bold" htmlFor="color">
          Color
          <select
            name="color"
            id="color"
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            required
          >
            <option value="default" disabled>
              Select a color
            </option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="gray">Gray</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="font-bold" htmlFor="owner">
          Owner
          <input
            className="w-full py-1 px-2 mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 sm:py-2 sm:px-4"
            type="text"
            placeholder="Stephen William Hawking"
            name="owner"
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value);
            }}
            required
          />
        </label>
        <button
          type="submit"
          className="font-bold mt-5 w-full col-span-2 p-2 bg-gradient-to-r text-gray-800 border border-yellow-500 shadow-md rounded-full hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-gray-100"
          // onClick={() => {
          //   CreateCar();
          // }}
        >
          Save car
        </button>
      </form>
    </div>
  );
};

export default Cars;
