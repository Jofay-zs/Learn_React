import { getConection } from "../db/db.js";
import jwt_decode from "jwt-decode";

const authorizationUserState = async (req, res, next) => {
  // get user from the token
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt_decode(token)["http://localhost/userData"];
  // console.log(user);

  // query the user in the DB
  const db = getConection();
  await db
    .collection("users")
    .findOne({ email: user.email }, async (error, response) => {
      if (response) {
        // console.log(response);
        // check the user's status
        if (response.status === "rejected") {
          // if the user is rejected, return an authentication error
          return res.sendStatus(401);
        } else {
          // if the user is pending or authorized, run next()
          next();
        }
      }
      else{
        next();
      }
    });
};

export default authorizationUserState;
