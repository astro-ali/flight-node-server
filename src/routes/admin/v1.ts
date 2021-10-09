import * as express from "express";
import AdminController from "../../controllers/admin/v1/admin.controller";
import AirportController from "../../controllers/admin/v1/airport.controller";
import CityController from "../../controllers/admin/v1/city.controller";
import HomeController from "../../controllers/web/v1/home.controller";
import auth from "../../middlewares/admin/auth";

const route = express.Router();

// admin routes

// login
route.post('/login', AdminController.login);


// auth
route.use(auth);

// get admin information
route.get('/getMe', AdminController.getAdminInfo);

// City CRUD

// Add new city
route.post('/cities', CityController.createCity);

// get all cities
route.get('/cities', HomeController.getAllCities);

// get one city by id
route.get('/cities/:id', HomeController.getOneCity);

// edit city by id
route.put('/cities/:id', CityController.edit);

// delete city by id
route.delete('/cities/:id', CityController.delete);

// Airport CRUD

// add new Airport
route.post('/airports', AirportController.create);

// get all airports
route.get('/airports', HomeController.getAllAirports);

export default route;