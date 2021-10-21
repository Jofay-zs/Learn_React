import axios from "axios";

// Vehicles CRUD
export const getVehiclesApi = async (success, error) => {
  const options = { method: "GET", url: "http://localhost:5000/cars/" };
  await axios.request(options).then(success).catch(error);
};

export const createVehicleApi = async (data, success, error) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/cars/",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(success).catch(error);
};

export const editVehicleApi = async (id, data, success, error) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/cars/${id}/`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(success).catch(error);
};

export const deleteVehicleApi = async (id, success, error) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/cars/${id}/`,
    headers: { "Content-Type": "application/json" },
  };
  await axios.request(options).then(success).catch(error);
};

// Users CRUD
export const getUsersApi = async (success, error) => {
  const options = { method: "GET", url: "http://localhost:5000/users/" };
  await axios.request(options).then(success).catch(error);
};


// Sales CRUD
export const getSalesApi = async (success, error) => {
  const options = { method: "GET", url: "http://localhost:5000/sales/" };
  await axios.request(options).then(success).catch(error);
};

export const createSaleApi = async (data, success, error) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/sales/",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(success).catch(error);
};