import React, { useEffect, useState, useRef } from "react";
import "styles/cars.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "context/darkMode";
import { nanoid } from "nanoid";

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

  const { darkMode } = useDarkMode();
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
    <div className={`${darkMode ? "text-gray-100" : "text-gray-800"}`}>
      <div>
        <div className="flex justify-center items-center">
          <h2 className="font-extrabold text-2xl py-4 px-1">
            Vehicles managment
          </h2>
        </div>
        <div className="flex justify-center items-center mb-5 sm:block sm:p-5">
          <button
            onClick={() => {
              setShowTable(!showTable);
            }}
            className={`font-bold text-xl bg-gradient-to-r border border-yellow-500  py-2 px-4 shadow rounded ${changeButtonColor} hover:text-gray-100`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      {showTable ? (
        <CarsTable vehiclesList={vehicles} />
      ) : (
        <CarsForm
          setShowTable={setShowTable}
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

const TableItem = ({ elementToEdit, elementToSet, currentItem }) => {
  const [item, setItem] = useState(currentItem);
  const edit = elementToEdit;
  const set = elementToSet;

  var [temporal] = useState(item);

  return (
    <td>
      {edit ? (
        <div className="flex items-center">
          <input
            type="text"
            className="w-full outline-none border border-gray-800 px-2 py-1 text-gray-800"
            defaultValue={item}
            onChange = {(e)=>{
              temporal = e.target.value;
            }}
          />
          <button type='submit'>
            <i
              className="fas fa-check text-gray-800 mx-1 cursor-pointer text-xl hover:text-green-500"
              onClick={() => {
                setItem(temporal);
                set(!edit);
              }}
            ></i>
          </button>
          <i
            className="fas fa-times text-gray-800 mx-1 cursor-pointer text-xl hover:text-red-500"
            onClick={() => {
              set(!edit);
            }}
          ></i>
        </div>
      ) : (
        <div
          onClick={() => {
            set(!edit);
          }}
          className="cursor-pointer"
        >
          {item}
        </div>
      )}
    </td>
  );
};

const VehicleRow = ({ vehicle }) => {
  const [editName, setEditName] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [editOwner, setEditOwner] = useState(false);
  return (
    // nanoid is a tool that guarantees that every element will have an unique ID.
    <tr>
      <td>{vehicle.ID}</td>
      <TableItem
        vehicle={vehicle}
        elementToEdit={editName}
        elementToSet={setEditName}
        currentItem={vehicle.name}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editBrand}
        elementToSet={setEditBrand}
        currentItem={vehicle.brand}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editModel}
        elementToSet={setEditModel}
        currentItem={vehicle.model}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editColor}
        elementToSet={setEditColor}
        currentItem={vehicle.color}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editOwner}
        elementToSet={setEditOwner}
        currentItem={vehicle.owner}
      />
    </tr>
  );
};

const CarsTable = ({ vehiclesList }) => {
  // useEffect(() => {
  //   console.log("Cars List:", vehiclesList);
  // }, [vehiclesList]);

  const { darkMode } = useDarkMode();

  const form = useRef(null);
  
    // const submitEditTableCars = (e) => {
    //   e.preventDefault();
    //   const fd = new FormData(form.current);
    //   console.log(e);
    // }

  return (
    <div className="flex flex-col justify-center items-center w-screen px-10 h-full">
      <h2
        className={`text-2xl font-bold  mb-5 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Look at all the vehicles
      </h2>
      {/* //onSubmit={submitEditTableCars} */}
      <form ref={form} className="w-full">
        <table className="cars-table w-full">
          <thead className="text-xl font-bold">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesList.map((vehicle) => {
              return <VehicleRow key={nanoid()} vehicle={vehicle} />;
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

const CarsForm = ({ setShowTable, vehiclesList, addVehicle }) => {
  const form = useRef(null);


  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newVehicle = {};

    formData.forEach((value, key) => {
      newVehicle[key] = value;
    });

    setShowTable(true);

    addVehicle([...vehiclesList, newVehicle]);

    toast.success("Vehicle added successfully 🦼", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Falta crear el caso y mensaje de error
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-5">Create new car</h2>
      </div>
      <div>
        <form
          ref={form}
          onSubmit={submitForm}
          className="block w-screen py-5 px-7 sm:grid sm:grid-cols-2 sm:gap-5 sm:px-20 lg:px-52 xl:px-72 2xl:px-96"
        >
          <label className="font-bold" htmlFor="ID">
            ID
            <input
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
              type="number"
              placeholder="0001"
              name="ID"
              min="1"
              required
            />
          </label>
          <label className="font-bold" htmlFor="name">
            Name
            <input
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
              type="text"
              placeholder="Tesla model S"
              name="name"
              required
            />
          </label>
          <label className="font-bold" htmlFor="brand">
            Brand
            <input
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
              type="text"
              placeholder="Tesla"
              name="brand"
              required
            />
          </label>
          <label className="font-bold" htmlFor="model">
            Model
            <input
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
              type="number"
              placeholder="2020"
              name="model"
              min="1950"
              max="2022"
              required
            />
          </label>
          <label className="font-bold" htmlFor="color">
            Color
            <select
              name="color"
              id="color"
              className={`text-gray-800 w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4`}
              required
              defaultValue={0}
            >
              <option value={0} disabled>
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
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
              type="text"
              placeholder="Stephen William Hawking"
              name="owner"
              required
            />
          </label>
          <button
            type="submit"
            className="font-bold mt-5 w-full col-span-2 p-2 bg-gradient-to-r border border-yellow-500 shadow-md rounded-full hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-gray-100"
          >
            Save car
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cars;
