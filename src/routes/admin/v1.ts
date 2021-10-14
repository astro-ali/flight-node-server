import * as express from "express";
import AdminController from "../../controllers/admin/v1/admin.controller";
import AirportController from "../../controllers/admin/v1/airport.controller";
import CityController from "../../controllers/admin/v1/city.controller";
import FlightController from "../../controllers/admin/v1/flight.controller";
import HomeController from "../../controllers/web/v1/home.controller";
import auth from "../../middlewares/admin/auth";

const route = express.Router();

// admin routes

// login
route.post('/login', AdminController.login);


// Auth
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

// get one airport by id
route.get('/airports/:id', HomeController.getOneAirport);

// edit airport by id
route.put('/airports/:id', AirportController.edit);

// delete airport by id
route.delete('/airports/:id', AirportController.delete);

// Flight CRUD

// add new Flight
route.post('/flights', FlightController.create);

// get all flights with pagination
route.get('/flights', HomeController.getAllFlights);

// get one flight by id
route.get('/flights/:id', HomeController.getOneFlight);

// edit one flight by id
route.put('/flights/:id', FlightController.edit);

// delete flight by id
route.delete('/flights/:id', FlightController.delete);

export default route;