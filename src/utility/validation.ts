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
}
