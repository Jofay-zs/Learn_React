import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectDB } from "./db/db.js";
import vehiclesRoutes from "./views/cars/routes.js";
import usersRoutes from "./views/users/routes.js";
import salesRoutes from "./views/sales/routes.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import authorizationUserState from "./middlewares/authorizationUserState.js";

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Cors());
app.use(Express.json());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:
      "https://project02-concessionaire-jofay-zs.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "authentication-api-projec02-concessionaire",
  issuer: "https://project02-concessionaire-jofay-zs.us.auth0.com/",
  algorithms: ["RS256"],
});

// The backend ask to auth0 if the token is valid
app.use(jwtCheck);

app.use(authorizationUserState);

app.use(vehiclesRoutes);
app.use(usersRoutes);
app.use(salesRoutes);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log("Listen port", process.env.PORT);
  });
};

conectDB(main);
