import { Express, Router } from "express";
import * as product from "../controllers/product.controller";
import { productSchema } from "../schemas/product_schema";
import { typeValidation } from "../middlewares/validation";
import { param } from "express-validator";

function init(app: Express) {
  const router = Router();

  // Create a new Product
  router.post("/", productSchema(), typeValidation, product.create);

  // Retrieve all Products
  router.get("/", product.findAll);

  // Retrieve a single Product with id
  router.get("/:id", [param("id").isInt()], typeValidation, product.findOne);

  // Update a Product with id
  router.put("/:id", productSchema(), typeValidation, product.update);

  // Delete a Product with id
  router.delete(
    "/:id",
    [param("id").isInt()],
    typeValidation,
    product.deleteOne
  );

  // Delete all Products
  router.delete("/", product.deleteAll);

  app.use("/api/product", router);
}

export { init };
