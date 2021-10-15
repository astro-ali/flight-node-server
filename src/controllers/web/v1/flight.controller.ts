import { Response } from "express";
import { Flight } from "../../../entity/Flight";
import { User } from "../../../entity/User";
import { errRes, isNumber, okRes } from "../../../utility/util";

export default class FlightController {
  /**
   * A Book function to book a new flight to the user
   * @param req
   * @param res
   * @returns respone with new user obj
   */
  static async book(req: any, res: Response): Promise<Response> {
    // get the id param
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // get the user obj from
    let user: User = req.user;

    // get the flight obj from DB by id
    try {
      var flight = await Flight.findOne({ where: { id: parseInt(id) } });
      if (!flight) return errRes(res, "flight not found", 404);

      // update the user flights by adding the
      // flight as new flight to the flights list
      let exists: boolean = false;

      for (const fly of user.flights) {
        if (fly.id == flight.id) {
            exists = true;
        }
      }

      if(!exists) user.flights = [...user.flights, flight];

      // save in DB
      user.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response with the new user object
    let { password, ...userObj } = user;
    return okRes(res, { userObj });
  }

  static async unbook(req: any, res: Response): Promise<Response> {
    // get the id param
    let id = req.params.id;

    // validate the id param
    let number = isNumber(id);
    if (!number) return errRes(res, "id param should be a number");

    // get the user obj from req
    let user: User = req.user;

    try {
      // get the flight obj from DB by id
      var flight = await Flight.findOne({ where: { id: parseInt(id) } });
      if (!flight) return errRes(res, "flight not found", 404);

      // update the user flights by removing the
      // flight from the flights list
      for (const i in user.flights) {
        if (user.flights[i].id === flight.id) {
          user.flights.splice(parseInt(i), 1);
        }
      }

      // save in DB
      user.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, { errMsg });
    }

    // return ok response with user obj
    let { password, ...userObj } = user;
    return okRes(res, { userObj });
  }
}
