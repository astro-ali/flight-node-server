import * as express from "express";
import FlightController from "../../controllers/web/v1/flight.controller";
import HomeController from "../../controllers/web/v1/home.controller";
import UserController from "../../controllers/web/v1/user.controller";
import auth from "../../middlewares/web/auth";

const route = express.Router();

// user routes

// register
route.post('/register', UserController.register);

//login
route.post('/login', UserController.login);

// Flight routes

// get all flights
route.get('/flights', HomeController.getAllFlights);

// get one flight by id
route.get('/flights/:id', HomeController.getOneFlight);

// authorization middleware
route.use(auth);
// after user logged in

// get user info
route.get('/getMe', UserController.getUserInfo);

//change password
route.post('/changePassword', UserController.changePassword);

// City routes

// get all cities
route.get('/cities', HomeController.getAllCities);

// get one city by id
route.get('/cities/:id', HomeController.getOneCity);

// Airport routes

// get all Airport
route.get('/airports', HomeController.getAllAirports);

// get one flight by id
route.get('/airports/:id', HomeController.getOneAirport);

// Flight routes

// get all flights
route.get('/flights', HomeController.getAllFlights);

// get one flight by id
route.get('/flights/:id', HomeController.getOneFlight);

// Flight booking routes

// book a flight
route.get('/book/:id', FlightController.book);

// unbook a flight
route.get('/unbook/:id', FlightController.unbook);

export default route;