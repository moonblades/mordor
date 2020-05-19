import { Express, Router } from "express";
import * as business from "../controllers/business.controller";

function init(app: Express) {
  var router = Router();

  // Create a new business
  router.post("/", business.create);

  // Retrieve all businesss
  router.get("/", business.findAll);

  // Retrieve a single business with id
  router.get("/:id", business.findOne);

  // Update a business with id
  router.put("/:id", business.update);

  // Delete a business with id
  router.delete("/:id", business.deleteOne);

  // Delete all businesss
  router.delete("/", business.deleteAll);

  app.use("/api/business", router);
}

export { init };
