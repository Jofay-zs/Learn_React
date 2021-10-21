import Express from "express";
import {queryAllVehicles, queryCreateVehicle, queryUpdateVehicle, queryDeleteVehicle} from "../../controllers/cars/controller.js";

const vehiclesRoutes = Express.Router();

const generalCallback = (res) => {
  return (err, result) => {
    if (err) {
      res.status(500).send("Error consulting vehicles");
    } else {
      res.json(result);
    }
  };
};

vehiclesRoutes.route("/cars").post((req, res) => {
  queryCreateVehicle(req.body, generalCallback(res));
});

vehiclesRoutes.route("/cars").get((req, res) => {
  queryAllVehicles(generalCallback(res));
});

vehiclesRoutes.route("/cars/:id").patch((req, res) => {
  queryUpdateVehicle(req.params.id, req.body, generalCallback(res));
});

vehiclesRoutes.route("/cars/:id").delete((req, res) => {
  queryDeleteVehicle(req.params.id, generalCallback(res));
});

export default vehiclesRoutes;
