import { Express, Router } from "express";
import * as schedule from "../controllers/schedule.controller";
import {
  createScheduleSchema,
  updateScheduleSchema,
} from "../schemas/schedule.schema";
import { typeValidation } from "../middlewares/validation";
import { param } from "express-validator";

function init(app: Express) {
  const router = Router();

  // Create a new schedule
  router.post(
    "/:id/schedule",
    createScheduleSchema(),
    typeValidation,
    schedule.create
  );

  // Retrieve all business schedule
  router.get(
    "/:id/schedule",
    [param("id").isInt()],
    typeValidation,
    schedule.findAll
  );

  router.get(
    "/:id/schedule/:scheduleId",
    [param("id").isInt(), param("scheduleId").isInt()],
    typeValidation,
    schedule.findOne
  );

  // Update a schedule
  router.put(
    "/:id/schedule/:scheduleId",
    updateScheduleSchema(),
    typeValidation,
    schedule.update
  );

  // Delete a schedule
  router.delete(
    "/:id/schedule/:scheduleId",
    [param("id").isInt(), param("scheduleId").isInt()],
    typeValidation,
    schedule.deleteOne
  );

  // Delete all schedules
  router.delete(
    "/:id/schedule",
    [param("id").isInt()],
    typeValidation,
    schedule.deleteAll
  );

  app.use("/api/business", router);
}

export { init };
