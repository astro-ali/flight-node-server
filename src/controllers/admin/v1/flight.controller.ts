import { Request, Response } from "express";
import { errRes, isNumber, okRes } from "../../../utility/util";
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
        where: { id: body.origin },
      });
      if (!origin)
        return errRes(res, "Origin with its given id not found", 404);
      let destination = await Airport.findOne({
        where: { id: body.destination },
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
    // get the id param and the body
    let id = req.params.id;
    let body: any = req.body;

    // validate the id param and the body
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");
    let notValid = validate(body, Validator.flight(false));
    if (notValid) return errRes(res, notValid);

    // fetch origin from DB if exists in req body
    if ("origin" in body) {
      try {
        var origin = await Airport.findOne({ where: { id: body.origin } });
        if (!origin)
          return errRes(res, "Origin of the given id is not found", 404);
      } catch (error) {
        let errMsg = error.detail ? error.detail : error;
        return errRes(res, { errMsg });
      }
    }

    // fetch destination from DB if exists in req body
    if ("destination" in body) {
      try {
        var destination = await Airport.findOne({
          where: { id: body.destination },
        });
        if (!destination)
          return errRes(res, "Destination of the given id is not found", 404);
      } catch (error) {
        let errMsg = error.detail ? error.detail : error;
        return errRes(res, { errMsg });
      }
    }

    try {
      // get the flight object from DB by id
      var flight = await Flight.findOne({
        where: { id: parseInt(id) },
        relations: ["origin", "destination"],
      });
      if (!flight) return errRes(res, "Flight of the given id not found", 404);

      // update it
      console.log(origin);
      console.log(destination);
      Object.keys(flight).forEach((key) => {
        if (key === "origin") {
          flight[key] = origin;
        } else if (key === "destination") {
          flight[key] = destination;
        } else {
          if (body[key]) {
            flight[key] = body[key];
          }
        }
      });
      // save in DB
      flight.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response with the new flight obj.
    return okRes(res, { flight });
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
    // get the id params from req
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // delete the flight by the given id
    try {
      var result = await Flight.delete({ id: parseInt(id) });
      if(result.affected === 0) return errRes(res, "the flight with the given id not found");
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response
    return okRes(res, { result });
  }
}
