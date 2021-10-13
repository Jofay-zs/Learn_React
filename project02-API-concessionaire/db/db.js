import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringConection = process.env.DATABASE_URL;

const client = new MongoClient(stringConection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conection;

const conectDB = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conecting DB");
      return 'error';
    }
    conection = db.db("concessionaire");
    console.log("Successfull conection");
    return callback();
  });
};

const getConection = () => {
  return conection;
}

export {conectDB, getConection};