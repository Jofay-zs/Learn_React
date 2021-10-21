import { getConection } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllSales = async (callback) => {
  const conection = getConection();
  await conection.collection("sales").find().limit(50).toArray(callback);
};

const queryCreateSale = async (saleData, callback) => {
  const conection = getConection();
  await conection.collection("sales").insertOne(saleData, callback);
};

const queryUpdateSale = async (id, saleData, callback) => {
  const filterSale = { _id: new ObjectId(id) };
  const atomicOperation = {
    $set: saleData,
  };
  const conection = getConection();
  await conection
    .collection("sales")
    .findOneAndUpdate(
      filterSale,
      atomicOperation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const queryDeleteSale = async (id, callback) => {
  const filterSale = { _id: new ObjectId(id) };
  const conection = getConection();
  await conection.collection("sales").deleteOne(filterSale, callback);
};

export { queryAllSales, queryCreateSale, queryUpdateSale, queryDeleteSale };
