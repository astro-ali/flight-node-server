import * as express from "express";
import UserController from "../../controllers/web/v1/user.controller";
import auth from "../../middlewares/web/auth";

const route = express.Router();

// user routes

// register
route.post('/register', UserController.register);

//login
route.post('/login', UserController.login);

// authorization middleware
route.use(auth);
// after user logged in

//change password
route.post('/changePassword', UserController.changePassword);

export default route;