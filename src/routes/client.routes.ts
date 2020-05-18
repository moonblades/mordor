import { Express, Router } from "express";
import * as client from "../controllers/client.controller";

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

  app.use("/api/client", router);
}

export { init };
