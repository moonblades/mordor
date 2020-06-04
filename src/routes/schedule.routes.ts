import { Express, Router } from "express";
import * as schedule from "../controllers/schedule.controller";

function init(app: Express) {
  const router = Router();

  // Create a new schedule
  router.post("/:id/schedule", schedule.create);

  // Retrieve all business schedule
  router.get("/:id/schedule", schedule.findAll);

  router.get("/:id/schedule/:scheduleId", schedule.findOne);

  // Update a schedule
  router.put("/:id/schedule/:scheduleId", schedule.update);

  // Delete a schedule
  router.delete("/:id/schedule/:scheduleId", schedule.deleteOne);

  // Delete all schedules
  router.delete("/:id/schedule", schedule.deleteAll);

  app.use("/api/business", router);
}

export { init };
