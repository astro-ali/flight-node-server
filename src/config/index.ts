require("dotenv").config();

export default {
  port: process.env.PORT,
  user_secret: process.env.USER_SECRET,
  admin_secret: process.env.ADMIN_SECRET,
  testing_domain: `${process.env.TESTING_DOMAIN}:${process.env.PORT}`
};