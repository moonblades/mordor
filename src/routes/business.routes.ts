import { Express, Router } from "express";
import { check, validationResult, param } from "express-validator";
import * as business from "../controllers/business.controller";
import { reservationSchema } from "../schemas/reservation.schema";
import { productSchema } from "../schemas/product_schema";
import { typeValidation } from "../middlewares/validation";

function init(app: Express) {
  const router = Router();

  // Retrieve all businesss
  router.get("/", business.findAll);

  // Retrieve a single business with id
  router.get(
    "/:id",
    [param("id").isNumeric()],
    typeValidation,
    business.findOne
  );

  // Create a new reservation for user
  router.post(
    "/:id/reservation",
    reservationSchema(),
    typeValidation,
    business.createReservation
  );

  // Retrieve all reservation for business
  router.get(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    business.findAllReservation
  );

  // Retrieve a reservation for business
  router.get(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    business.findOneReservation
  );

  // Update a reservation for business
  router.put(
    "/:id/reservation/:reservationId",
    reservationSchema(),
    typeValidation,
    business.updateReservation
  );

  // Delete a reservation for business
  router.delete(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    business.deleteOneReservation
  );

  // Delte all reservation for business
  router.delete(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    business.deleteAllReservation
  );

  // Create a new product for user
  router.post(
    "/:id/product",
    productSchema(),
    typeValidation,
    business.createProduct
  );

  // Retrieve all product for business
  router.get(
    "/:id/product",
    [param("id").isNumeric()],
    typeValidation,
    business.findAllProduct
  );

  // Retrieve a product for business
  router.get(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.findOneProduct
  );

  // Update a product for business
  router.put(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.updateProduct
  );

  // Delete a product for business
  router.delete(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.deleteOneProduct
  );

  // Delte all product for business
  router.delete(
    "/:id/product",
    [param("id").isNumeric()],
    typeValidation,
    business.deleteAllProduct
  );

  // Add user to business
  router.post(
    "/:id/user/:userId",
    [param("id").isNumeric(), param("userId").isNumeric()],
    typeValidation,
    business.addUser
  );

  app.use("/api/business", router);
}

export { init };
