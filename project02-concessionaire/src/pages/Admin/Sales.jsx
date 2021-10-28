import React, { useState, useEffect, useRef } from "react";
import { getUsersApi } from "utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getVehiclesApi } from "utils/api";
import { nanoid } from "nanoid";
import { createSaleApi } from "utils/api";
import { useDarkMode } from "context/darkMode";
import "styles/sales.css";
import FormButton from "components/FormButton";

const Sales = () => {
  const [vendors, setVendors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const form = useRef(null);
  const { darkMode } = useDarkMode();
  const [vehiclesTable, setVehiclesTable] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      await getUsersApi(
        (response) => {
          setVendors(response.data);
        },
        (error) => {
          console.error("There is an error getting users data:", error);
          toast.error("Error getting data 😢", {
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

    const fetchVehicles = async () => {
      await getVehiclesApi(
        (response) => {
          setVehicles(response.data);
        },
        (error) => {
          console.error("There is an error getting vehicles data:", error);
          toast.error("Error getting data 😢", {
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

    fetchVendors();
    fetchVehicles();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const formData = {};

    fd.forEach((value, key) => {
      formData[key] = value;
    });

    //Iterate over the keys of this object
    const vehiclesList = Object.keys(formData)
      .map((k) => {
        if (k.includes("vehicle")) {
          return vehiclesTable.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    const saleData = {
      vendor: vendors.filter((v) => v._id === formData.vendor)[0],
      totalPurchaseValue: formData.totalPurchase,
      vehicles: vehiclesList,
    };

    await createSaleApi(
      saleData,
      (response) => {
        toast.success("Successfully added sale 🦼", {
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
        toast.error("Error adding sale 😢", {
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
    <div
      className={`h-full w-screen flex flex-col justify-center items-center ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <header className="w-full flex justify-center items-center py-4">
        <h2 className="text-3xl font-extrabold">Add a new Sale</h2>
      </header>
      <section className="w-full h-full flex flex-col justify-center items-center px-4">
        <form onSubmit={submitForm} ref={form} className="">
          <label htmlFor="vendor" className="flex flex-col">
            <span className="font-bold">Vendor Selection</span>
            <select
              name="vendor"
              className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-primary py-2 px-4 text-gray-800"
              defaultValue=""
              required
            >
              <option disabled value="">
                Select a vendor
              </option>
              {vendors.map((el) => {
                return (
                  <option
                    key={nanoid()}
                    value={el._id}
                  >{`${el.name} ${el.lastName}`}</option>
                );
              })}
            </select>
          </label>
          <VehiclesTable
            vehicles={vehicles}
            setVehicles={setVehicles}
            setVehiclesTable={setVehiclesTable}
          />
          <FormButton type='submit' description='Create Sale'/>
        </form>
      </section>
    </div>
  );
};

const VehiclesTable = ({ vehicles, setVehicles, setVehiclesTable }) => {
  const [actualAddedVehicle, setActualAddedVehicle] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [totalPurchaseValue, setTotalPurchaseValue] = useState(0);

  const addNewVehicle = () => {
    setTableRows([...tableRows, actualAddedVehicle]);
    setVehicles(vehicles.filter((v) => v._id !== actualAddedVehicle._id));
    setTotalPurchaseValue(
      totalPurchaseValue + parseInt(actualAddedVehicle.price)
    );
    setActualAddedVehicle({});
  };

  const deleteNewVehicle = (vehicleToDelete) => {
    setTableRows(tableRows.filter((v) => v._id !== vehicleToDelete._id));
    setTotalPurchaseValue(totalPurchaseValue - parseInt(vehicleToDelete.price));
    setVehicles([...vehicles, vehicleToDelete]);
  };

  useEffect(() => {
    setVehiclesTable(tableRows);
  }, [tableRows, setVehiclesTable]);

  return (
    <section className="">
      <div className="flex flex-col h-full w-full">
        <span className="font-bold">Vehicles Selection</span>
        <label htmlFor="purchaseValue">
          <label className="flex flex-col">
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="number"
              name="totalPurchase"
              required
              hidden
              value={totalPurchaseValue}
              onChange={(e) => {
                setTotalPurchaseValue(totalPurchaseValue);
              }}
            />
          </label>
        </label>
        <div>
          <span>Total purchase value -- </span>
          {totalPurchaseValue}
        </div>
        <label htmlFor="vehicle" className="flex flex-col">
          <select
            className="w-full mb-2 bg-gray-100 border border-gray-400 rounded-lg outline-none focus:border-primary py-2 px-4 text-gray-800"
            value={actualAddedVehicle._id ?? ""}
            onChange={(e) => {
              setActualAddedVehicle(
                vehicles.filter((v) => v._id === e.target.value)[0]
              );
            }}
          >
            <option disabled value="">
              Select a vehicle
            </option>
            {vehicles.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} - ${el.brand} - ${el.model} - ${el.color} - ${el.price}`}</option>
              );
            })}
          </select>
        </label>
        <button
          className="font-bold mt-5 w-full col-span-2 p-2 border border-gray-200 shadow-md rounded-full hover:bg-myRed hover:text-gray-100"
          type="button"
          onClick={() => {
            addNewVehicle();
          }}
        >
          Add new vehicle
        </button>
        <section className="h-auto max-h-80 overflow-y-scroll w-full mt-10">
          <table className="sales-table h-auto max-h-96 overflow-y-scroll w-full">
            <thead className="sticky top-0">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Price</th>
                <th>Delete</th>
                <th className="hidden">Input</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((el, index) => {
                return (
                  <tr key={nanoid()}>
                    <td>{el._id}</td>
                    <td>{el.name}</td>
                    <td>{el.brand}</td>
                    <td>{el.model}</td>
                    <td>{el.color}</td>
                    <td>{el.price}</td>
                    <td hidden>
                      <label htmlFor={`vehiclePrice_${index}`}>
                        <input
                          hidden
                          type="number"
                          name={`vehiclePrice_${index + 1}`}
                          defaultValue={el.price}
                        />
                      </label>
                    </td>
                    <td className="flex justify-center items-center">
                      <i
                        className="fas fa-trash hover:text-red-500 cursor-pointer text-lg"
                        onClick={() => {
                          deleteNewVehicle(el);
                        }}
                      ></i>
                    </td>
                    <td hidden>
                      <input
                        hidden
                        defaultValue={el._id}
                        name={`vehicle_${index + 1}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
};

export default Sales;
