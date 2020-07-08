import { Express, Router } from "express";
import * as vacation from "../controllers/vacation.controller";
import { param } from "express-validator";
import { typeValidation } from "../middlewares/validation";

function init(app: Express) {
  const router = Router();

  // Create a new vacation
  router.post("/:id/vacation", vacation.create);

  // Retrieve all business vacation
  router.get(
    "/:id/vacation",
    [param("id").isInt()],
    typeValidation,
    vacation.findAll
  );

  router.get(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    vacation.findOne
  );

  // Update a vacation
  router.put(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    vacation.update
  );

  // Delete a vacation
  router.delete(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    vacation.deleteOne
  );

  // Delete all vacations
  router.delete(
    "/:id/vacation",
    [param("id").isInt()],
    typeValidation,
    vacation.deleteAll
  );

  app.use("/api/business", router);
}

export { init };
