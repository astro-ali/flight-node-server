import { errRes } from "../../utility/util";
import CONFIG from "../../config";
import * as jwt from "jsonwebtoken";
import { User } from "../../entity/User";

export default async (req, res, next) => {
  // get the token
  let token = req.headers.token;
  if (!token) return errRes(res, "You need to register");

  // verify the token
  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.user_secret);
    if(!payload) return errRes(res, "You are not authorized");

    // get the user from DB by id
    let user = await User.findOne({ where: { id: payload.id } });

    // pass the user obj to the request obj
    req.user = user;

    // next
    return next();
  } catch (error) {
      return errRes(res, error);
  }
};
