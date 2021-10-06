require("dotenv").config();

export default {
  port: process.env.PORT,
  user_secret: process.env.USER_SECRET,
  admin_secret: process.env.ADMIN_SECRET
};