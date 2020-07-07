import { Express, Router } from "express";
import * as user from "../controllers/user.controller";
import { typeValidation } from "../middlewares/validation";
import { param, body } from "express-validator";
import { userSchema } from "../schemas/user.schema";
import { reservationSchema } from "../schemas/reservation.schema";
import { businessSchema } from "../schemas/business.schema";

function init(app: Express) {
  const router = Router();

  // Create a new user
  router.post(
    "/",
    [
      body("email").isEmail(),
      body("displayName").isString(),
      body("imageUrl").isURL(),
    ],
    typeValidation,
    user.create
  );

  // Retrieve all users
  router.get("/", user.findAll);

  // Retrieve a single user with id
  router.get("/:id", [param("id").isNumeric()], typeValidation, user.findOne);

  // Update a user with id
  router.put("/:id", userSchema(), typeValidation, user.update);

  // Delete a user with id
  router.delete(
    "/:id",
    [param("id").isNumeric()],
    typeValidation,
    user.deleteOne
  );

  // Delete all users
  router.delete("/", user.deleteAll);

  // Retrieve all reservation for user
  router.get(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    user.findAllReservation
  );

  // Retrieve a reservation for user
  router.get(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    user.findOneReservation
  );

  // Create a new reservation for user
  router.post(
    "/:id/reservation",
    reservationSchema(),
    typeValidation,
    user.createReservation
  );

  // Update a reservation for user
  router.put(
    "/:id/reservation/:reservationId",
    reservationSchema(),
    typeValidation,
    user.updateReservation
  );

  // Delete a reservation for user
  router.delete(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    user.deleteOneReservation
  );

  // Delte all reservation for user
  router.delete(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    user.deleteAllReservation
  );

  // Retrieve all business for user
  router.get(
    "/:id/business",
    [param("id").isNumeric()],
    typeValidation,
    user.findAllBusinesses
  );

  // Create business for user
  router.post(
    "/:id/business",
    businessSchema(),
    typeValidation,
    user.createBusiness
  );

  // Update business for user
  router.put(
    "/:id/business/:businessId",
    businessSchema(),
    typeValidation,
    user.updateBusiness
  );

  // Delete business for user
  router.delete(
    "/:id/business/:businessId",
    [param("id").isNumeric(), param("businessId").isNumeric()],
    typeValidation,
    user.deleteOneBusiness
  );

  // Delete all businesses for user
  router.delete(
    "/:id/business",
    [param("id").isNumeric()],
    typeValidation,
    user.deleteAllBusinesses
  );

  // Add favorite to business
  router.post(
    "/:id/favorite/:businessId",
    [param("id").isNumeric(), param("businessId").isNumeric()],
    typeValidation,
    user.addFavorite
  );

  // Retrieve all favorites for user
  router.get(
    "/:id/favorite",
    [param("id").isNumeric()],
    typeValidation,
    user.findAllFavorites
  );

  app.use("/api/user", router);
}

export { init };
