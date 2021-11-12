import { getConection } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";

const queryAllUsers = async (callback) => {
  const conection = getConection();
  await conection.collection("users").find().limit(50).toArray(callback);
};

const queryConsultUser = async (id, callback) => {
  const db = getConection();
  await db.collection("users").findOne({ _id: new ObjectId(id) }, callback);
};

const queryConsultOrCreateUser = async (req, callback) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt_decode(token)["http://localhost/userData"];
  const db = getConection();
  await db
    .collection("users")
    .findOne({ email: user.email }, async (error, response) => {
      // console.log("response queryCosultOrCreateUser:", response);
      if (response) {
        callback(error, response);
      } else {
        user.auth0ID = user._id;
        delete user._id;
        user.rol='no role';
        user.status = 'pending'
        await queryCreateUser(user, (error, response) => {
          callback((error, user));
        });
      }
    });
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
  queryConsultUser,
  queryConsultOrCreateUser,
};
