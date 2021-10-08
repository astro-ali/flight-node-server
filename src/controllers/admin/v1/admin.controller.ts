import { Request, Response } from "express";
import { LoginBody } from "../../../types";
import { errRes, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { Admin } from "../../../entity/Admin";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";

export default class AdminController {
  /**
   * login for admins
   * @param req
   * @param res
   * @returns response with token
   */
  static async login(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: LoginBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.login());
    if (notValid) return errRes(res, notValid);

    // get the admin from DB by username
    try {
      var admin = await Admin.findOne({ where: { username: body.username } });
      if (!admin) return errRes(res, "Didn't find your username");
    } catch (error) {
      return errRes(res, "Didn't find your username");
    }

    // compare password
    let match = await bcrypt.compare(body.password, admin.password);
    if (!match) return errRes(res, "the password is not valid");

    // generate token
    let token = jwt.sign({ id: admin.id }, CONFIG.admin_secret);

    // return ok response with token
    return okRes(res, { token });
  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns response with admin object
   */
  static async getAdminInfo(req, res): Promise<Response> {
    
    // get the admin from req object
    let admin = req.admin;

    // return response with admin object
    let { password, ...adminObj } = admin;
    return okRes(res, { adminObj });
  }
}
