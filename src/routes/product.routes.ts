import { Express, Router } from "express";
import * as product from "../controllers/product.controller";

function init(app: Express) {
  var router = Router();

  // Create a new Dummy
  router.post("/", product.create);

  // Retrieve all Dummies
  router.get("/", product.findAll);

  // Retrieve a single Dummy with id
  router.get("/:id", product.findOne);

  // Update a Dummy with id
  router.put("/:id", product.update);

  // Delete a Dummy with id
  router.delete("/:id", product.deleteOne);

  // Delete all Dummies
  router.delete("/", product.deleteAll);

  app.use("/api/product", router);
}

export { init };
