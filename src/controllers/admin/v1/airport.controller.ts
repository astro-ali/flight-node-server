import { Request, Response } from "express";
import { AirportBody } from "../../../types";
import { errRes, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { Airport } from "../../../entity/Airport";
import { City } from "../../../entity/City";

export default class AirportController {
  /**
   * create new airport function
   * @param req
   * @param res
   * @returns response with the created object
   */
  static async create(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: AirportBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.airport());
    if (notValid) return errRes(res, notValid);

    try {
      // get the city with the given id
      let city = await City.findOne({ where: { id: body.city } });
      if (!city) return errRes(res, "City with the given ID not found", 404);

      // create new Airport object
      var airport = Airport.create({
        name: body.name,
        code: body.code,
        city: city,
      });

      // save in DB
      await airport.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response with the airport object
    return okRes(res, { airport });
  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns response obj with the edited airport
   */
  static async edit(req: Request, res: Response): Promise<Response> {
    // TODO:
    // get the id param and the body

    // validate the id and the body

    // get the Airport object from DB by id

    // update it

    // save in DB

    // return ok res with the new Airport object.
    return okRes(res, {});
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    // TODO:
    // get the id from req params

    // validate the id param

    // delete the city from DB

    // return ok response
    return okRes(res, {});
  }
}
