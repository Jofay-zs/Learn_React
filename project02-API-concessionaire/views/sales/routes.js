import Express from "express";
import {
  queryAllSales,
  queryCreateSale,
  queryUpdateSale,
  queryDeleteSale,
} from "../../controllers/sales/controller.js";

const salesRoutes = Express.Router();

const generalCallback = (res) => {
  return (err, result) => {
    if (err) {
      res.status(500).send("Error consulting sales");
    } else {
      res.json(result);
    }
  };
};

salesRoutes.route("/sales").post((req, res) => {
  queryCreateSale(req.body, generalCallback(res));
});

salesRoutes.route("/sales").get((req, res) => {
  queryAllSales(generalCallback(res));
});

salesRoutes.route("/sales/:id").patch((req, res) => {
  queryUpdateSale(req.params.id, req.body, generalCallback(res));
});

salesRoutes.route("/sales/:id").delete((req, res) => {
  queryDeleteSale(req.params.id, generalCallback(res));
});

export default salesRoutes;
