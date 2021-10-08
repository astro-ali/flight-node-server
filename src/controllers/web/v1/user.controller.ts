import { Response, Request } from "express";
import { errRes, okRes } from "../../../utility/util";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import * as bcrypt from "bcryptjs";
import { User } from "../../../entity/User";
import { changePassowrdBody, LoginBody, RegisterBody } from "../../../types";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../../config";

export default class UserController {

  /**
   * 
   * @param req 
   * @param res 
   * @returns response with usr obj
   */
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
    // userObj is a user object without the hashed password
    let { password, ...userObj } = user;
    return okRes(res, { userObj });
  }

  /**
   * login function 
   * @param req 
   * @param res 
   * @returns Promise --> response
   */
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
    // get the body
    let body: changePassowrdBody = req.body;

    // validate the body
    let notValid = validate(body, Validator.changePassword());
    if (notValid) return errRes(res, notValid);

    // get the user form request obj
    let user = req.user;

    // compare the body password with user password
    let match = await bcrypt.compare(body.password, user.password);
    if (!match) return errRes(res, "the password is invalid");

    // hash the new password
    let salt = await bcrypt.genSalt(12);
    let newHashedPassword = await bcrypt.hash(body.new_password, salt);

    // replace user password with new hash
    user.password = newHashedPassword;

    // update the password
    await user.save();

    // return ok response
    let { password, ...userObj } = user;
    return okRes(res, { userObj });
  }
}
