import { errRes } from "../../utility/util";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { Admin } from "../../entity/Admin";

export default async (req, res, next) => {
  // get the token
  let token = req.headers.token;
  if (!token) return errRes(res, "You need to register");

  // verify the token
  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.admin_secret);
    if (!payload) return errRes(res, "You are not Authorized");

    // get the admin from DB by id
    let admin = await Admin.findOne({ where: { id: payload.id } });

    // pass the admin obj to the request obj
    req.admin = admin;

    // next
    return next();
  } catch (err) {
    return errRes(res, err);
  }
};
