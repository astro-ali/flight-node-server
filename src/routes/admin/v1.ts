import * as express from "express";
import AdminController from "../../controllers/admin/v1/admin.controller";
import auth from "../../middlewares/admin/auth";

const route = express.Router();

// admin routes

// login
route.post('/login', AdminController.login);

// auth
route.use(auth);
// every route after this middleware
// should carry admin token

// get admin information
route.get('/getMe', AdminController.getAdminInfo);

export default route;