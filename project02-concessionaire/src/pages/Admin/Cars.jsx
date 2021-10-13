import React, { useEffect, useState, useRef } from "react";
import "styles/cars.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "context/darkMode";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@mui/material";
import axios from "axios";

// Make a form that asks the user for the age and displays a message that says if the user is older or not

const Cars = () => {
  const [showTable, setShowTable] = useState(false);
  const [buttonText, setButtonText] = useState("Create new car");
  const [changeButtonColor, setChangeButtonColor] = useState("indigo");

  const [vehicles, setVehicles] = useState([]);

  const [runQuery, setRunQuery] = useState(true);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    const obtainVehicles = async () => {
      var config = {
        method: "GET",
        url: "http://localhost:5000/cars",
        headers: {},
      };

      await axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          setVehicles(response.data);
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Error getting data 😢", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
    if(runQuery){
      obtainVehicles();
      setRunQuery(false);
    }
  }, [runQuery]);

  useEffect(() => {
    // Geeting vehicles list from the Frontend
    if (showTable) {
      setRunQuery(true);
    }
  }, [showTable]);

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
        <CarsTable vehiclesList={vehicles} setRunQuery={setRunQuery}/>
      ) : (
        <CarsForm
          setShowTable={setShowTable}
          vehiclesList={vehicles}
          addVehicle={setVehicles}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

const TableItem = ({
  elementToEdit,
  elementToSet,
  currentItem,
  vehicle,
  importantDecision,
  setRunQuery,
}) => {
  const [item] = useState(currentItem);
  const edit = elementToEdit;
  const set = elementToSet;

  var [temporal] = useState(item);

  const updateVehicle = async () => {
    let data;

    if (importantDecision === "name") {
      data = JSON.stringify({
        id: vehicle._id,
        name: temporal,
      });
    } else if (importantDecision === "brand") {
      data = JSON.stringify({
        id: vehicle._id,
        brand: temporal,
      });
    } else if (importantDecision === "model") {
      data = JSON.stringify({
        id: vehicle._id,
        model: temporal,
      });
    } else if (importantDecision === "color") {
      data = JSON.stringify({
        id: vehicle._id,
        color: temporal,
      });
    } else if (importantDecision === "owner") {
      data = JSON.stringify({
        id: vehicle._id,
        owner: temporal,
      });
    }

    var config = {
      method: "PATCH",
      url: "http://localhost:5000/cars/edit",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        toast.success("Successfully updated vehicle 🚀", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRunQuery(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error updating vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <td>
      {edit ? (
        <div className="flex items-center">
          <input
            type="text"
            className="w-full outline-none border border-gray-800 px-2 py-1 text-gray-800"
            defaultValue={item}
            onChange={(e) => {
              temporal = e.target.value;
            }}
          />
          <button type="submit">
            <Tooltip title="Confirm" arrow>
              <i
                className="fas fa-check text-gray-800 mx-1 cursor-pointer text-xl hover:text-green-500"
                onClick={() => {
                  set(!edit);
                  updateVehicle();
                }}
              ></i>
            </Tooltip>
          </button>
          <Tooltip title="Cancel" arrow>
            <i
              className="fas fa-times text-gray-800 mx-1 cursor-pointer text-xl hover:text-red-500"
              onClick={() => {
                set(!edit);
              }}
            ></i>
          </Tooltip>
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

const VehicleRow = ({ vehicle, setRunQuery }) => {
  const [editName, setEditName] = useState(false);
  const [editBrand, setEditBrand] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [editOwner, setEditOwner] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const deleteVehicle = async () => {
    var data = JSON.stringify({
      id: vehicle._id,
    });

    var config = {
      method: "DELETE",
      url: "http://localhost:5000/cars/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        toast.success("Successfully deleted vehicle 🚔", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRunQuery(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error deleting vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    // nanoid is a tool that guarantees that every element will have an unique ID.
    <tr>
      <td>{vehicle._id.slice(18)}</td>
      <TableItem
        vehicle={vehicle}
        elementToEdit={editName}
        elementToSet={setEditName}
        currentItem={vehicle.name}
        importantDecision={"name"}
        setRunQuery = {setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editBrand}
        elementToSet={setEditBrand}
        currentItem={vehicle.brand}
        importantDecision={"brand"}
        setRunQuery = {setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editModel}
        elementToSet={setEditModel}
        currentItem={vehicle.model}
        importantDecision={"model"}
        setRunQuery = {setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editColor}
        elementToSet={setEditColor}
        currentItem={vehicle.color}
        importantDecision={"color"}
        setRunQuery = {setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editOwner}
        elementToSet={setEditOwner}
        currentItem={vehicle.owner}
        importantDecision={"owner"}
        setRunQuery = {setRunQuery}
      />
      <Tooltip title="Delete" arrow>
        <td>
          <div className="flex items-center justify-center m-0 p-0 ">
            <i
              className="fas fa-trash mx-1 cursor-pointer hover:text-red-500"
              onClick={() => setOpenDialog(true)}
            ></i>
          </div>
        </td>
      </Tooltip>
      <Dialog open={openDialog}>
        <div className=" flex-col bg-gray-500 text-gray-100 p-5">
          <h3 className="mb-5 text-xl">Are you sure to remove the vehicle ?</h3>
          <div className="flex justify-between">
            <button
              onClick={() => {
                deleteVehicle();
                setOpenDialog(false);
              }}
              className="text-md border border-gray-100 px-2 py-1 hover:bg-green-700 w-full mr-1"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setOpenDialog(false);
              }}
              className="text-md border border-gray-100 px-2 py-1 hover:bg-red-700 w-full ml-1"
            >
              No
            </button>
          </div>
        </div>
      </Dialog>
    </tr>
  );
};

const CarsTable = ({ vehiclesList, setRunQuery }) => {
  const { darkMode } = useDarkMode();

  const form = useRef(null);

  // const submitEditTableCars = (e) => {
  //   e.preventDefault();
  //   const fd = new FormData(form.current);
  //   console.log(e);
  // }

  const [search, setSearch] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(vehiclesList);

  useEffect(() => {
    setFilteredVehicles(
      vehiclesList.filter((e) => {
        return JSON.stringify(e).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, vehiclesList]);

  return (
    <div className="flex flex-col items-center w-screen px-10 h-auto sm:h-full">
      <h2
        className={`text-2xl font-bold  mb-5 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Look at all the vehicles
      </h2>
      <div className="flex justify-start w-full items-center">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder={"Search"}
          className="w-auto my-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-yellow-500 py-2 px-4"
        />
        <i className="fas fa-search ml-2 text-xl"></i>
      </div>
      {/* //onSubmit={submitEditTableCars} */}
      <form ref={form} className="w-full">
        <div className="hidden sm:block max-h-96 overflow-y-auto">
          <table className="cars-table w-full">
            <thead className="text-xl font-bold">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => {
                return (
                  <VehicleRow
                    key={nanoid()}
                    vehicle={vehicle}
                    setRunQuery={setRunQuery}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:hidden">
          {filteredVehicles.map((e) => {
            return (
              <div className="w-full bg-gray-500 rounded-xl p-5 my-2 flex flex-col shadow">
                <span>{e._id.slice(18)}</span>
                <span>{e.name}</span>
                <span>{e.brand}</span>
                <span>{e.model}</span>
                <span>{e.color}</span>
                <span>{e.owner}</span>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

const CarsForm = ({ setShowTable, vehiclesList, addVehicle }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newVehicle = {};

    formData.forEach((value, key) => {
      newVehicle[key] = value;
    });

    var data = JSON.stringify({
      // _id: newVehicle._id,
      name: newVehicle.name,
      brand: newVehicle.brand,
      model: newVehicle.model,
      color: newVehicle.color,
      owner: newVehicle.owner,
    });

    var config = {
      method: "POST",
      url: "http://localhost:5000/cars/new",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        toast.success("Successfully added vehicle 🦼", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error adding vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setShowTable(true);

    // addVehicle([...vehiclesList, newVehicle]);
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
