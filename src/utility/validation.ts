export default class Validate {
  constructor(parameters) {}

  static register = (must = true) => ({
    first_name: {
      presence: must,
      type: "string",
    },
    last_name: {
      presence: must,
      type: "string",
    },
    username: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
      email: true,
    },
    password: {
      presence: must,
      type: "string",
      length: {
        minimum: 4,
        message: "must be at least 4 characters",
      },
    },
    passport_id: {
      presence: must,
      type: "string",
      length: {
        is: 9,
      },
    },
    passport_image: {
      presence: must,
      type: "string",
      url: true,
    },
  });

  static login = (must = true) => ({
    username: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static changePassword = (must = true) => ({
    password: {
      presence: must,
      type: "string",
    },
    new_password: {
      presence: must,
      type: "string",
    },
  });

  static city = (must = true) => ({
    name: {
      presence: must,
      type: "string",
      length: {
        minimum: 1,
        message: "must be at least 1 character",
      },
    },
    code: {
      presence: must,
      type: "string",
      length: {
        minimum: 3,
        message: "must be at least 3 characters",
      },
    },
  });

  static airport = (must = true) => ({
    name: {
      presence: must,
      type: "string",
      length: {
        minimum: 1,
        message: "must be at least 1 character",
      },
    },
    code: {
      presence: must,
      type: "string",
      length: {
        minimum: 3,
        message: "must be at least 3 characters",
      },
    },
    city: {
      presence: must,
      type: "number",
    },
  });

  static flight = (must = true) => ({
    duration: {
      presence: must,
      type: "string",
    },
    distance: {
      presence: must,
      type: "string",
    },
    boarding_time: {
      presence: must,
      type: "string",
    },
    attendance_time: {
      presence: must,
      type: "string",
    },
    origin: {
      presence: must,
      type: "number",
    },
    destination: {
      presence: must,
      type: "number",
    },
  });
}
