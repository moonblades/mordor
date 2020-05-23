import { Express, Router } from "express";
import * as reservation from "../controllers/reservation.controller";

function init(app: Express) {
  var router = Router();

  // Retrieve all reservation
  router.get("/", reservation.findAll);

  // Retrieve reservation
  router.get("/:id", reservation.findOne);

  // Add product to reservation
  router.post("/:id/product/:productId", reservation.addProduct);

  // TODO:
  // // Remove product from reservation
  // router.delete("/:id/product/:productId", reservation.removeProduct);

  app.use("/api/reservation", router);
}

export { init };
