import { getConection } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllVehicles = async (callback) => {
  const conection = getConection();
  await conection.collection("vehicles").find().limit(50).toArray(callback);
};

const queryCreateVehicle = async (vehicleData, callback) => {
  if (
    Object.keys(vehicleData).includes("name") &&
    Object.keys(vehicleData).includes("brand") &&
    Object.keys(vehicleData).includes("model") &&
    Object.keys(vehicleData).includes("color") &&
    Object.keys(vehicleData).includes("price")
  ) {
    const conection = getConection();
    await conection.collection("vehicles").insertOne(vehicleData, callback);
  } else {
    return "error";
  }
};

const queryUpdateVehicle = async (id, vehicleData, callback) => {
  const filterVehicle = { _id: new ObjectId(id) };
  const atomicOperation = {
    $set: vehicleData,
  };
  const conection = getConection();
  await conection
    .collection("vehicles")
    .findOneAndUpdate(
      filterVehicle,
      atomicOperation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const queryDeleteVehicle = async (id, callback) => {
  const filterVehicle = { _id: new ObjectId(id) };
  const conection = getConection();
  await conection.collection("vehicles").deleteOne(filterVehicle, callback);
};

export { queryAllVehicles, queryCreateVehicle, queryUpdateVehicle, queryDeleteVehicle };
