import { Express, Router } from "express";
import * as vacation from "../controllers/vacation.controller";
function init(app: Express) {
  var router = Router();

  // Create a new vacation
  router.post("/:id/vacation", vacation.create);

  // Retrieve all business vacation
  router.get("/:id/vacation", vacation.findAll);

  router.get("/:id/vacation/:vacationId", vacation.findOne);

  // Update a vacation
  router.put("/:id/vacation/:vacationId", vacation.update);

  // Delete a vacation
  router.delete("/:id/vacation/:vacationId", vacation.deleteOne);

  // Delete all vacations
  router.delete("/:id/vacation", vacation.deleteAll);

  app.use("/api/business", router);
}

export { init };
