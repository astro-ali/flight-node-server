import { Request, Response } from "express";
import { errRes, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { Airport } from "../../../entity/Airport";
import { FlightBody } from "../../../types";
import { Flight } from "../../../entity/Flight";

export default class FlightController {
  /**
   * add new flight function
   * @param req
   * @param res
   * @returns respone with the flight obj
   */
  static async create(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: FlightBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.flight());
    if (notValid) return errRes(res, notValid);

    try {
      // get the origin and the destination by id
      let origin = await Airport.findOne({
        where: { id: parseInt(body.origin) },
      });
      if (!origin)
        return errRes(res, "Origin with its given id not found", 404);
      let destination = await Airport.findOne({
        where: { id: parseInt(body.destination) },
      });
      if (!destination)
        return errRes(res, "Destination with its given id not found", 404);
      // create new flight and add origin and destination to it
      var flight = Flight.create({
        duration: body.duration,
        distance: body.distance,
        attendance_time: body.attendance_time,
        boarding_time: body.boarding_time,
        origin: origin,
        destination: destination,
      });
      //save in DB
      await flight.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response with the flight object
    return okRes(res, { flight });
  }

  /**
   * this function edit the flight obj
   * @param req
   * @param res
   * @returns respone with the edited flight obj
   */
  static async edit(req: Request, res: Response): Promise<Response> {
    //TODO:
    // get the id param and the body

    // validate the id param and the body

    // fetch origin from DB if exists in req body

    // fetch destination from DB if exists in req body

    // get the flight object from DB by id

    // update it

    // save in DB

    // return ok response with the new flight obj.
    return okRes(res, {});
  }

  /**
   * This function delete the flight
   * by the given id from database
   * @param req
   * @param res
   * @returns response with the affected
   * property that incates wheather the obj
   * got deleted or not
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    //TODO:
    
    // get the id params from req

    // validate the id param

    // delete the flight by the given id

    // return ok response 
    return okRes(res, {});
  }
}
