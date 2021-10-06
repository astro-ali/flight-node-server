import { Response, Request } from "express";
import { errRes, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import * as bcrypt from "bcryptjs";
import { User } from "../../../entity/User";
import { LoginBody, RegisterBody } from "../../../types";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";

export default class UserController {
  static async register(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: RegisterBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.register());
    if (notValid) return errRes(res, notValid);

    // hash his password
    let salt = await bcrypt.genSalt(12);
    let hash = await bcrypt.hash(body.password, salt);
    body.password = hash;

    // check if user is already exists in DB
    let user = await User.findOne({ where: { username: body.username } });
    if (user) return errRes(res, `Username ${body.username} is already exists`);

    // save the user in DB
    user = User.create(body);
    await user.save();

    // return res with the user obj
    return okRes(res, { user });
  }

  static async login(req: Request, res: Response): Promise<Response> {
    // get the body
    let body: LoginBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.login());
    if (notValid) return errRes(res, notValid);

    // get the user from DB by username
    try {
      var user = await User.findOne({ where: { username: body.username } });
      if (!user) return errRes(res, "Didn't find your username");
    } catch (error) {
      return errRes(res, "Didn't find your username");
    }

    // compaire the body password with the password in DB
    let hash = user.password;
    let logged = await bcrypt.compare(body.password, hash);
    if (!logged) return errRes(res, "the password is not valid");

    // generate token
    let token = jwt.sign({ id: user.id }, CONFIG.user_secret);

    //return ok response with the token
    return okRes(res, { token });
  }

  /**
   * @param req 
   * @param res 
   * @returns 
   */
  static async changePassword(req: any, res: Response): Promise<Response> {

    let user = req.user;

    TODO:
    // get the body 

    // validate the body 

    // get the user form request obj

    // compare the body password with user password

    // hash the new password

    // replace user password with new hash

    // update the password

    // return ok response
    return okRes(res, { msg: "hello you are logged in", user: user });
  }
}
