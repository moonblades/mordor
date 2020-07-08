import { Express, Router } from "express";
import * as reservation from "../controllers/reservation.controller";
import { typeValidation } from "../middlewares/validation";
import { param } from "express-validator";

function init(app: Express) {
  const router = Router();

  // Retrieve all reservation
  router.get("/", reservation.findAll);

  // Retrieve reservation
  router.get(
    "/:id",
    [param("id").isInt()],
    typeValidation,
    reservation.findOne
  );

  // Add product to reservation
  router.post(
    "/:id/product/:productId",
    [param("id").isInt(), param("productId").isInt()],
    typeValidation,
    reservation.addProduct
  );

  // TODO:
  // // Remove product from reservation
  // router.delete("/:id/product/:productId", reservation.removeProduct);

  app.use("/api/reservation", router);
}

export { init };
