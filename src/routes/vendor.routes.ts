import { Express, Router } from "express";
import * as vendor from "../controllers/vendor.controller";

function init(app: Express) {
  var router = Router();

  router.post("/", vendor.create);

  app.use("/api/vendor", router);
}

export { init };
