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

export { RegisterBody, LoginBody};