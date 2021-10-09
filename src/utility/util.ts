import { Response } from "express";

/**
 * ReE
 * @param body
 */
const errRes = (res: Response, err: any, code = 400, key = "err") => {
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  } else if (typeof err == "string") {
    let obj = {};
    obj[key] = [err];
    err = obj;
  }
  if (typeof code !== "undefined") res.statusCode = code;
  return res.json({ status: false, errMsg: err });
};

/**
 * ReS
 * @param body
 */
const okRes = (res: Response, data, code = 200) => {
  // Success Web Response
  let sendData = { status: true, errMsg: "" };

  if (typeof data == "object") {
    sendData = Object.assign(data, sendData); //merge the objects
  }
  if (typeof code !== "undefined") res.statusCode = code;
  return res.json(sendData);
};

// will generate you a 4-digits otp number.
const getOtp = () => Math.floor(1000 + Math.random() * 9000);

// if it's a number return flase
//
const isNotANumber = (x: any) => {
  return x !== x;
};

const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

export { okRes, errRes, getOtp, isNotANumber, isNumber };
