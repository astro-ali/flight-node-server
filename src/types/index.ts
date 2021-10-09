import { City } from "../entity/City"

type RegisterBody = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    passport_id: string;
    passport_image:string;
}

type LoginBody = {
    username: string;
    password: string;
}

type changePassowrdBody = {
    password: string;
    new_password: string;
}

type cityBody = {
    name: string;
    code: string;
}

type AirportBody = {
    name: string;
    code: string;
    city: City | number;
}


export { RegisterBody, LoginBody, changePassowrdBody, cityBody, AirportBody};