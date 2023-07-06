import { Router } from "express";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import token from "./routes/token";
// import { projectConfig } from "../../../../medusa-config";

const cors = require("cors");

export default () => {
  const router = Router();
  // router.use(
  //   cors({ origin: ["http://localhost:8000","http://test:3000"], credentials: true })
  // );
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  auth(router);
  token(router);

  return router;
};
