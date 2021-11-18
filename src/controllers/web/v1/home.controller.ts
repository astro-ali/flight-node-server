import { Request, Response } from "express";
import { isEmpty } from "validate.js";
import { Airport } from "../../../entity/Airport";
import { City } from "../../../entity/City";
import { Flight } from "../../../entity/Flight";
import { okRes, errRes, isNumber, isNotANumber } from "../../../utility/util";
import CONFIG from "../../../config";

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
      var airports = await Airport.find({
        relations: ["city", "OriginFlights", "destinationFlights"],
      });
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
        relations: ["city","OriginFlights","destinationFlights"],
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
    // get the queries
    let query = req.query;
    let page: any = query.page;
    let perPage: any = query.perPage;

    // get all the users from DB
    const flights = await Flight.find({
      relations: ["origin", "destination", "users"],
    });

    // check if the query is empty and if it ture retuen all users
    if (isEmpty(query)) return okRes(res, { flights });

    // check if the values are numbers or not
    let numPage: number = parseInt(page);
    let numPerPage: number = parseInt(perPage);
    if (isNotANumber(numPage)) {
      return errRes(res, "query params are not a number");
    }

    // check if the query contain the page
    if (page == null) return okRes(res, { flights });

    // check if the value of page query is 0
    if (page == "0") return okRes(res, { flights });

    // get the query params
    let realPage: number;
    let realTake: number;

    if (perPage) realTake = +perPage;
    // the plus sign is for casting the string perPage into number
    else {
      perPage = "5";
      realTake = 5;
    }

    // check if the user passed a page
    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
      realPage = 0;
      page = "1";
    }

    // get the data paginated form DB
    const findOptions = {
      take: realTake,
      skip: realPage,
      relations: ["origin", "destination", "users"],
    };

    let data: any = await Flight.find(findOptions);
    if (data.length === 0) return errRes(res, "there is no more data", 404);

    // return ok response with the paginated result
    return okRes(res, {
      data,
      perPage: realTake,
      page: +page || 1,
      next: `${
        CONFIG.testing_domain
      }/admin/v1/flights?perPage=${realTake}&page=${+page + 1}`,
      prev: `${
        CONFIG.testing_domain
      }/admin/v1/flights?perPage=${realTake}&page=${+page - 1}`,
    });
  }

  /**
   * A function to get only one flight by id.
   * @param req
   * @param res
   * @returns response with the flight obj
   */
  static async getOneFlight(req: Request, res: Response): Promise<Response> {
    // get the id param from the req obj
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // get the flight by id
    try {
      var flight = await Flight.findOne({
        where: { id: parseInt(id) },
        relations: ["origin", "destination", "users"],
      });
      if (!flight) return errRes(res, "flight not found", 404);
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return the flight with ok response
    return okRes(res, { flight });
  }
}
