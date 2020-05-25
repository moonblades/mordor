import { Express, Router } from "express";
import * as business from "../controllers/business.controller";

function init(app: Express) {
  var router = Router();

  // Retrieve all businesss
  router.get("/", business.findAll);

  // Retrieve a single business with id
  router.get("/:id", business.findOne);

  // Create a new reservation for client
  router.post("/:id/reservation", business.createReservation);

  // Retrieve all reservation for business
  router.get("/:id/reservation", business.findAllReservation);

  // Retrieve a reservation for business
  router.get("/:id/reservation/:reservationId", business.findOneReservation);

  // Update a reservation for business
  router.put("/:id/reservation/:reservationId", business.updateReservation);

  // Delete a reservation for business
  router.delete(
    "/:id/reservation/:reservationId",
    business.deleteOneReservation
  );

  // Delte all reservation for business
  router.delete("/:id/reservation", business.deleteAllReservation);

  // Create a new product for client
  router.post("/:id/product", business.createProduct);

  // Retrieve all product for business
  router.get("/:id/product", business.findAllProduct);

  // Retrieve a product for business
  router.get("/:id/product/:productId", business.findOneProduct);

  // Update a product for business
  router.put("/:id/product/:productId", business.updateProduct);

  // Delete a product for business
  router.delete("/:id/product/:productId", business.deleteOneProduct);

  // Delte all product for business
  router.delete("/:id/product", business.deleteAllProduct);

  // Add client to business
  router.post("/:id/client/:clientId", business.addClient);

  app.use("/api/business", router);
}

export { init };
