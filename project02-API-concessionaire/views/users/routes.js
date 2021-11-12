import Express from "express";
import {
  queryAllUsers,
  queryCreateUser,
  queryUpdateUser,
  queryDeleteUser,
  queryConsultUser,
  queryConsultOrCreateUser,
} from "../../controllers/users/controller.js";

const usersRoutes = Express.Router();

const generalCallback = (res) => {
  return (err, result) => {
    if (err) {
      res.status(500).send("Error consulting users");
    } else {
      res.json(result);
    }
  };
};

usersRoutes.route("/users").post((req, res) => {
  queryCreateUser(req.body, generalCallback(res));
});

usersRoutes.route("/users/self").get((req, res) => {
  queryConsultOrCreateUser(req, generalCallback(res));
});

usersRoutes.route("/users/:id").get((req, res) => {
  queryConsultUser(req.params.id, generalCallback(res));
});


usersRoutes.route("/users").get((req, res) => {
  queryAllUsers(generalCallback(res));
});

usersRoutes.route("/users/:id").patch((req, res) => {
  queryUpdateUser(req.params.id, req.body, generalCallback(res));
});

usersRoutes.route("/users/:id").delete((req, res) => {
  queryDeleteUser(req.params.id, generalCallback(res));
});

export default usersRoutes;
