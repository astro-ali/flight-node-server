import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import CONFIG from "./config";
import { okRes } from "./utility/util";
import notFound from "./middlewares/web/notFound";
import webv1 from "./routes/web/v1";
import adminv1 from "./routes/admin/v1";
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

    // all the routes for the user.
    app.use("/v1", webv1);

    // all the routes for the admin.
    app.use("/admin/v1", adminv1);

    app.use(notFound);

    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch((error) => console.log(error));
