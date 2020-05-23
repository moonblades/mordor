import { Express, Router } from "express";
import * as reservation from "../controllers/reservation.controller";

function init(app: Express) {
  var router = Router();

  // Retrieve all reservation
  router.get("/", reservation.findAll);

  // Retrieve reservation
  router.get("/:id", reservation.findOne);

  app.use("/api/reservation", router);
}

export { init };
