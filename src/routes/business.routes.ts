import { Express, Router } from "express";
import * as business from "../controllers/business.controller";

function init(app: Express) {
  var router = Router();

  // Retrieve all businesss
  router.get("/", business.findAll);

  // Retrieve a single business with id
  router.get("/:id", business.findOne);

  app.use("/api/business", router);
}

export { init };
