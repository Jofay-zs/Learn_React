import React, { useEffect, useState, useRef } from "react";
import "styles/cars.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "context/darkMode";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@mui/material";
import {
  getVehiclesApi,
  createVehicleApi,
  editVehicleApi,
  deleteVehicleApi,
} from "utils/api";
import Loading from "components/Loading";
import FormInput from "components/FormInput";
import FormButton from "components/FormButton";
import PrivateComponent from "components/PrivateComponent";

const Cars = () => {
  const [showTable, setShowTable] = useState(false);
  const [buttonText, setButtonText] = useState("Create new car");
  const [changeButtonColor, setChangeButtonColor] = useState("indigo");
  const [vehicles, setVehicles] = useState([]);
  const [runQuery, setRunQuery] = useState(true);
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      await getVehiclesApi(
        (response) => {
          setVehicles(response.data);
          setRunQuery(false);
          setLoading(false);
        },
        (error) => {
          console.error("There is an error:", error);
          toast.error("Error getting data 😢", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        }
      );
    };

    if (runQuery) {
      fetchVehicles();
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
        "hover:bg-myRed"
      );
    } else {
      setButtonText("Show all");
      setChangeButtonColor(
        "hover:bg-myRed"
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
            className={`font-bold text-xl bg-gradient-to-r border border-gray-200 py-2 px-4 shadow rounded ${changeButtonColor} hover:text-gray-100`}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {showTable ? (
        <CarsTable
          vehiclesList={vehicles}
          setRunQuery={setRunQuery}
          loading={loading}
        />
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
  const {darkMode} = useDarkMode();
  const [item] = useState(currentItem);
  const edit = elementToEdit;
  const set = elementToSet;

  var [temporal] = useState(item);

  const updateVehicle = async () => {
    let data;
    if (importantDecision === "name") {
      data = JSON.stringify({
        name: temporal,
      });
    } else if (importantDecision === "brand") {
      data = JSON.stringify({
        brand: temporal,
      });
    } else if (importantDecision === "model") {
      data = JSON.stringify({
        model: temporal,
      });
    } else if (importantDecision === "color") {
      data = JSON.stringify({
        color: temporal,
      });
    } else if (importantDecision === "price") {
      data = JSON.stringify({
        price: temporal,
      });
    }

    await editVehicleApi(
      vehicle._id,
      data,
      (response) => {
        // console.log(response.data);
        toast.success("Successfully edited vehicle 🚀", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        elementToSet(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error editing vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  return (
    <td>
      {edit ? (
        <div className="flex items-center">
          <input
            type="text"
            className={`w-full outline-none border px-2 py-1 ${
              darkMode
                ? "text-gray-200 border-gray-200"
                : "text-gray-800 border-gray-800"
            }`}
            defaultValue={item}
            onChange={(e) => {
              temporal = e.target.value;
            }}
          />
          <PrivateComponent roleList={['admin']}>
            <button type="submit">
              <Tooltip title="Confirm" arrow>
                <i
                  className="fas fa-check text-gray-200 mx-1 cursor-pointer text-xl hover:text-green-500"
                  onClick={() => {
                    set(!edit);
                    updateVehicle();
                  }}
                ></i>
              </Tooltip>
            </button>
            <Tooltip title="Cancel" arrow>
              <i
                className="fas fa-times text-gray-200 mx-1 cursor-pointer text-xl hover:text-red-500"
                onClick={() => {
                  set(!edit);
                }}
              ></i>
            </Tooltip>
          </PrivateComponent>
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
  const [editPrice, setEditPrice] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const deleteVehicle = async () => {
    deleteVehicleApi(
      vehicle._id,
      (response) => {
        // console.log(response.data);
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
      },
      (error) => {
        console.error(error);
        toast.error("Error deleting vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  return (
    // nanoid is a tool that guarantees that every element will have an unique ID.
    <tr>
      <td>{vehicle._id.slice(10)}</td>
      <TableItem
        vehicle={vehicle}
        elementToEdit={editName}
        elementToSet={setEditName}
        currentItem={vehicle.name}
        importantDecision={"name"}
        setRunQuery={setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editBrand}
        elementToSet={setEditBrand}
        currentItem={vehicle.brand}
        importantDecision={"brand"}
        setRunQuery={setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editModel}
        elementToSet={setEditModel}
        currentItem={vehicle.model}
        importantDecision={"model"}
        setRunQuery={setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editColor}
        elementToSet={setEditColor}
        currentItem={vehicle.color}
        importantDecision={"color"}
        setRunQuery={setRunQuery}
      />
      <TableItem
        vehicle={vehicle}
        elementToEdit={editPrice}
        elementToSet={setEditPrice}
        currentItem={vehicle.price}
        importantDecision={"price"}
        setRunQuery={setRunQuery}
      />
      <Tooltip title="Delete" placement="left">
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

const CarsTable = ({ vehiclesList, setRunQuery, loading }) => {
  const { darkMode } = useDarkMode();

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
          className="w-auto my-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-primary py-2 px-4"
        />
        <i className="fas fa-search ml-2 text-xl"></i>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-full">
            <div className="hidden sm:block h-96 w-full overflow-y-scroll">
              <table className="cars-table w-full h-full">
                <thead className="sticky top-0">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Price</th>
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
          </section>
          <section className="flex flex-col sm:hidden w-full">
            {filteredVehicles.map((e) => {
              return (
                <div
                  className="w-full bg-gray-500 rounded-xl p-5 my-2 flex flex-col shadow"
                  key={nanoid()}
                >
                  <span>{e._id.slice(18)}</span>
                  <span>{e.name}</span>
                  <span>{e.brand}</span>
                  <span>{e.model}</span>
                  <span>{e.color}</span>
                  <span>{e.price}</span>
                </div>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

const CarsForm = ({ setShowTable }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const newVehicle = {};

    formData.forEach((value, key) => {
      newVehicle[key] = value;
    });

    const createVehicleApiData = JSON.stringify({
      name: newVehicle.name,
      brand: newVehicle.brand,
      model: newVehicle.model,
      color: newVehicle.color,
      price: newVehicle.price,
    });

    await createVehicleApi(
      createVehicleApiData,
      (response) => {
        // console.log(response.data);
        toast.success("Successfully added vehicle 🦼", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      (error) => {
        console.error(error);
        toast.error("Error adding vehicle 😢", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
    setShowTable(true);
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
          <FormInput
            htmlFor="name"
            description="Name"
            type="text"
            placeholder="Tesla Model S"
            inputName="name"
          />
          <FormInput
            htmlFor="brand"
            description="Brand"
            type="text"
            placeholder="Tesla"
            inputName="brand"
          />
          <FormInput
            htmlFor="model"
            description="Model"
            type="number"
            placeholder="2020"
            inputName="model"
          />
          <label className="font-bold" htmlFor="color">
            Color
            <select
              name="color"
              id="color"
              className={`text-gray-800 w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-myRed py-2 px-4`}
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
          <FormInput
            htmlFor="price"
            description="Price"
            type="number"
            placeholder="$"
            inputName="price"
          />
          <FormButton type='submit' description='Save car' />
        </form>
      </div>
    </div>
  );
};

export default Cars;
