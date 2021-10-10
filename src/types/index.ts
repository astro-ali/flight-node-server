import { City } from "../entity/City";

type RegisterBody = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  passport_id: string;
  passport_image: string;
};

type LoginBody = {
  username: string;
  password: string;
};

type changePassowrdBody = {
  password: string;
  new_password: string;
};

type cityBody = {
  name: string;
  code: string;
};

type AirportBody = {
  name: string;
  code: string;
  city: number;
};

type FlightBody = {
  duration: Date;
  distance: string;
  boarding_time: Date;
  attendance_time: Date;
  origin: string;
  destination: string;
};

export {
  RegisterBody,
  LoginBody,
  changePassowrdBody,
  cityBody,
  AirportBody,
  FlightBody,
};
