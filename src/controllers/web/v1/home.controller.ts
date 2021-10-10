import { Request, Response } from "express";
import { Airport } from "../../../entity/Airport";
import { City } from "../../../entity/City";
import { okRes, errRes, isNumber } from "../../../utility/util";

export default class HomeController {
  /**
   * @param req
   * @param res
   * @returns response of all cities
   */
  static async getAllCities(req: Request, res: Response): Promise<Response> {
    // get all cities from DB
    try {
      var cities = await City.find({ relations: ["airports"] });
      if (!cities)
        return errRes(res, "there are no cities in the system yet.", 404);
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return response with array of cities
    return okRes(res, { cities });
  }

  /**
   * @param req
   * @param res
   * @returns response with one city
   */
  static async getOneCity(req: Request, res: Response): Promise<Response> {
    // get the id param from req
    let id = req.params.id;

    // check if the pram was not a number
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // get the city from DB by id
    try {
      var city = await City.findOne({
        where: { id: id },
        relations: ["airports"],
      });
      if (!city) return errRes(res, "Not found", 404);
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // reutrn response with the city obj
    return okRes(res, { city });
  }

  /**
   * get all airports function
   * @param req
   * @param res
   * @returns response with a list of airports
   */
  static async getAllAirports(req: Request, res: Response): Promise<Response> {
    // get all Airports from DB
    try {
      var airports = await Airport.find({ relations: ["city"] });
      if (!airports) return errRes(res, "Not found", 404);
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return them with ok response
    return okRes(res, { airports });
  }

  /**
   * a function to get only one Airport by id.
   * @param req
   * @param res
   * @returns response object with one airport object
   */
  static async getOneAirport(req: Request, res: Response): Promise<Response> {
    // get the id param from req
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // get the airport from DB by id
    try {
      var airport = await Airport.findOne({
        where: { id: parseInt(id) },
        relations: ["city"],
      });
      if (!airport) return errRes(res, "not found", 404);
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // reutrn response with the airport obj
    return okRes(res, { airport });
  }

  /**
   * This function gets all the
   * flights from DB
   * @param req
   * @param res
   * @returns response with array of flights
   */
  static async getAllFlights(req: Request, res: Response): Promise<Response> {
    //TODO:

    // add pagination to this controller

    // add search options to this controller too
    
    // get all flights from DB 

    // return them with ok response
    return okRes(res, {});
  }

  /**
   * A function to get only one flight by id.
   * @param req 
   * @param res 
   * @returns response with the flight obj
   */
  static async getOneFlights(req: Request, res: Response): Promise<Response> {
    //TODO:

    // get the id param from the req obj

    // validate the id param

    // get the flight by id

    // return the flight with ok response
    return okRes(res, {});
  }
}
