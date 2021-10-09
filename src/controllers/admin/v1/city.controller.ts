import { Request, Response } from "express";
import { errRes, isNumber, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { City } from "../../../entity/City";
import { cityBody } from "../../../types";

export default class CityController {
  /**
   *
   * @param req
   * @param res
   * @returns response with city obj
   */
  static async createCity(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: cityBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.city());
    if (notValid) return errRes(res, notValid);

    // create the city and save it into DB
    try {
      var city = City.create({
        name: body.name,
        code: body.code,
      });
      await city.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    //return response with city obj
    return okRes(res, { city });
  }

  /**
   * edit function
   * @param req
   * @param res
   * @returns response with the edited object
   */
  static async edit(req: Request, res: Response): Promise<Response> {
    // get the id param and the body
    let id = req.params.id;
    let body = req.body;

    // validate the id and the body
    let number = isNumber(id);
    if (!number) return errRes(res, "id pram should be a number");
    let notValid = validate(body, Validator.city(false));
    if (notValid) return errRes(res, notValid);

    try {
      // get the city object from DB by id
      var city = await City.findOne({ where: { id: id } });
      if (!city) return errRes(res, "Not found", 404);
      // update it
      Object.keys(city).forEach((key) => {
        if (body[key]) city[key] = body[key];
      });

      // save in DB
      await city.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok res with the new city object.
    return okRes(res, { city });
  }

  /**
   * delete function
   * @param req
   * @param res
   * @returns response with the deleted obj
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    // get the id from req params
    let id = req.params.id;

    // validate id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id pram should be a number");

    try {
      // delete the city from DB
      var city = await City.delete({ id: parseInt(id) });
      if(city.affected === 0) return errRes(res, "Failed");
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }
    
    // return ok response
    return okRes(res, { city });
  }
}