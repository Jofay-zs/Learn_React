import axios from "axios";

// Functio to send the token that allows access to the request to express
const getToken = () =>{
  return `Bearer ${localStorage.getItem('token')}`
}


// Vehicles CRUD
export const getVehiclesApi = async (success, error) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/cars/",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(success).catch(error);
};

export const createVehicleApi = async (data, success, error) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/cars/",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(success).catch(error);
};

export const editVehicleApi = async (id, data, success, error) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/cars/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(success).catch(error);
};

export const deleteVehicleApi = async (id, success, error) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/cars/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };
  await axios.request(options).then(success).catch(error);
};


// Users CRUD
export const getUsersApi = async (success, error) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/users/",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(success).catch(error);
};

export const getInfoUserApi = async (success, error) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/users/self/",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(success).catch(error);
};

export const editUserApi = async (id, data, success, error) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/users/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(success).catch(error);
};

// Sales CRUD
export const getSalesApi = async (success, error) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/sales/",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(success).catch(error);
};

export const createSaleApi = async (data, success, error) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/sales/",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(success).catch(error);
};