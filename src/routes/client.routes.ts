import { Express, Router } from "express";
import * as client from "../controllers/client.controller";
import * as reservation from "../controllers/reservation.controller";

function init(app: Express) {
  var router = Router();

  // Create a new Client
  router.post("/", client.create);

  // Retrieve all Clients
  router.get("/", client.findAll);

  // Retrieve a single Client with id
  router.get("/:id", client.findOne);

  // Update a Client with id
  router.put("/:id", client.update);

  // Delete a Client with id
  router.delete("/:id", client.deleteOne);

  // Delete all Clients
  router.delete("/", client.deleteAll);

  // Create a new reservation for client
  router.post("/:id/reservation", client.createReservation);

  // Retrieve all reservation for client
  router.get("/:id/reservation", client.findAllReservation);

  // Retrieve a reservation for client
  router.get("/:id/reservation/:reservationId", client.findOneReservation);

  // Update a reservation for client
  router.put("/:id/reservation/:reservationId", client.updateReservation);

  // Delete a reservation for client
  router.delete("/:id/reservation/:reservationId", client.deleteOneReservation);

  // Delte all reservation for client
  router.delete("/:id/reservation", client.deleteAllReservation);

  app.use("/api/client", router);
}

export { init };
