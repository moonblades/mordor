import { Express, Router } from "express";
import * as product from "../controllers/product.controller";

function init(app: Express) {
  const router = Router();

  // Create a new Product
  router.post("/", product.create);

  // Retrieve all Products
  router.get("/", product.findAll);

  // Retrieve a single Product with id
  router.get("/:id", product.findOne);

  // Update a Product with id
  router.put("/:id", product.update);

  // Delete a Product with id
  router.delete("/:id", product.deleteOne);

  // Delete all Products
  router.delete("/", product.deleteAll);

  app.use("/api/product", router);
}

export { init };
