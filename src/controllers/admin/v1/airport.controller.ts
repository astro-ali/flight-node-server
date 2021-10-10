import { Request, Response } from "express";
import { AirportBody } from "../../../types";
import { errRes, isNumber, okRes } from "../../../utility/util";
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
    // get the id param and the body
    let id = req.params.id;
    let body = req.body;

    // validate the id and the body
    let number = isNumber(id);
    if (!number) return errRes(res, "id pram should be a number");
    let notValid = validate(body, Validator.airport(false));
    if (notValid) return errRes(res, notValid);

    try {
      // if city in body then get the city object by id
      if ("city" in body) {
        let city = await City.findOne({ where: { id: parseInt(body.city) } });
        if (!city) return errRes(res, "City of the given id not found", 404);

        // get the Airport object from DB by id
        var airport = await Airport.findOne({
          where: { id: parseInt(id) },
          relations: ["city"],
        });
        if (!airport) return errRes(res, "Not found", 404);
        // update it
        Object.keys(airport).forEach((key) => {
          if (key === "city") {
            airport[key] = city;
          } else {
            if (body[key]) airport[key] = body[key];
          }
        });
        // save in DB
        await airport.save();
      } else {
        // get the Airport object from DB by id
        var airport = await Airport.findOne({
          where: { id: parseInt(id) },
          relations: ["city"],
        });
        if (!airport) return errRes(res, "Not found", 404);

        // update it
        Object.keys(airport).forEach((key) => {
          if (body[key]) airport[key] = body[key];
        });

        // save in DB
        await airport.save();
      }
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok res with the new Airport object.
    return okRes(res, { airport });
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    // get the id from req params
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id pram should be a number");

    // delete the city from DB
    try {
      var result = await Airport.delete({ id: parseInt(id) });
      if(result.affected === 0) return errRes(res, "Failed");
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }
    
    // return ok response
    return okRes(res, { result });
  }
}