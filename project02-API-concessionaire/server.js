import Express, { response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from "cors";
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});
const stringConection = process.env.DATABASE_URL;

const client = new MongoClient(stringConection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conection;

const app = Express();

app.use(Cors());
app.use(Express.json());

app.post("/cars/new", (req, res) => {
  console.log(req);
  const vehiclesData = req.body;
  console.log("Keys: ", Object.keys(vehiclesData));
  try {
    if (
      Object.keys(vehiclesData).includes("name") &&
      Object.keys(vehiclesData).includes("brand") &&
      Object.keys(vehiclesData).includes("model") &&
      Object.keys(vehiclesData).includes("color") &&
      Object.keys(vehiclesData).includes("owner")
    ) {
      conection
        .collection("vehicles")
        .insertOne(vehiclesData, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.get("/cars", (req, res) => {
  console.log("Someone did get on the route /cars");
  conection
    .collection("vehicles")
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consulting vehicles");
      } else {
        res.json(result);
      }
    });
});

app.patch("/cars/edit", (req, res) => {
  const vehicleToEdit = req.body;
  const filterVehicle = { _id: new ObjectId(vehicleToEdit.id) };
  delete vehicleToEdit.id;
  const atomicOperation = {
    $set: vehicleToEdit,
  };
  conection
    .collection("vehicles")
    .findOneAndUpdate(
      filterVehicle,
      atomicOperation,
      { upsert: true, returnOriginal: true },
      (error, result) => {
        if (error) {
          console.error("Error updating vehicle: ", error);
          res.sendStatus(500);
        } else {
          console.log("Vehicle updated successfully");
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/cars/delete", (req, res) => {
  const vehicleToEdit = req.body;
  const filterVehicle = { _id: new ObjectId(vehicleToEdit.id) };
  conection.collection("vehicles").deleteOne(filterVehicle, (error, result) => {
    if (error) {
      console.log('Error deleting vehicle: ',error)
      res.sendStatus(500);
    } else {
      console.log('Vehicle deleted successfully');
      res.sendStatus(200);
    }
  });
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conecting DB");
    }
    conection = db.db("concessionaire");
    console.log("Successfull conection");
    return app.listen(process.env.PORT, () => {
      console.log("Listen port", process.env.PORT);
    });
  });
};
main();
