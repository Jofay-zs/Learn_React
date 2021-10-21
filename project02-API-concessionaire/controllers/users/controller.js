import { getConection } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllUsers = async (callback) => {
  const conection = getConection();
  await conection.collection("users").find().limit(50).toArray(callback);
};

const queryCreateUser = async (userData, callback) => {
    const conection = getConection();
    await conection.collection("users").insertOne(userData, callback);
};

const queryUpdateUser = async (id, userData, callback) => {
  const filterUser = { _id: new ObjectId(id) };
  const atomicOperation = {
    $set: userData,
  };
  const conection = getConection();
  await conection
    .collection("users")
    .findOneAndUpdate(
      filterUser,
      atomicOperation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const queryDeleteUser = async (id, callback) => {
  const filterUser = { _id: new ObjectId(id) };
  const conection = getConection();
  await conection.collection("users").deleteOne(filterUser, callback);
};

export {
  queryAllUsers,
  queryCreateUser,
  queryUpdateUser,
  queryDeleteUser,
};
