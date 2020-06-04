import { Express, Router } from "express";
import * as user from "../controllers/user.controller";
import * as reservation from "../controllers/reservation.controller";

function init(app: Express) {
  const router = Router();

  // Create a new user
  router.post("/", user.create);

  // Retrieve all users
  router.get("/", user.findAll);

  // Retrieve a single user with id
  router.get("/:id", user.findOne);

  // Update a user with id
  router.put("/:id", user.update);

  // Delete a user with id
  router.delete("/:id", user.deleteOne);

  // Delete all users
  router.delete("/", user.deleteAll);

  // Retrieve all reservation for user
  router.get("/:id/reservation", user.findAllReservation);

  // Retrieve a reservation for user
  router.get("/:id/reservation/:reservationId", user.findOneReservation);

  // Create a new reservation for user
  router.post("/:id/reservation", user.createReservation);

  // Update a reservation for user
  router.put("/:id/reservation/:reservationId", user.updateReservation);

  // Delete a reservation for user
  router.delete("/:id/reservation/:reservationId", user.deleteOneReservation);

  // Delte all reservation for user
  router.delete("/:id/reservation", user.deleteAllReservation);

  // Retrieve all business for user
  router.get("/:id/business", user.findAllBusinesses);

  // Create business for user
  router.post("/:id/business", user.createBusiness);

  // Update business for user
  router.put("/:id/business/:businessId", user.updateBusiness);

  // Delete business for user
  router.delete("/:id/business/:businessId", user.deleteOneBusiness);

  // Delete all businesses for user
  router.delete("/:id/business", user.deleteAllBusinesses);

  app.use("/api/user", router);
}

export { init };
