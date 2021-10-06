import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import CONFIG from "./config";
import { okRes } from "./utility/util";
import notFound from "./middlewares/web/notFound";
const app = express();

const port = CONFIG.port || 4000;

createConnection()
  .then(async (connection) => {
    console.log("Connected to DB successfully");
    //
    app.use(express.json());

    app.get("/", (req, res) => {
      okRes(res, { data: "hello world!" });
    });

    // all the routes for the normal user
    app.use("/v1", webRouter);

    // all the routes for the admin user
    app.use("/admin/v1", adminRouter);

    app.use(notFound);

    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch((error) => console.log(error));
