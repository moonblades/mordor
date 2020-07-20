import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  ScheduleNotFoundError,
} from "../../exceptions";

/**
 * Finds a schedule for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findOneSchedule(req: Request, res: Response, next: NextFunction) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Schedule.findByPk(scheduleId).then((schedule: Schedule) => {
        if (!schedule) {
          next(new ScheduleNotFoundError(scheduleId));
          return;
        }
        return res.status(200).send(schedule);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneSchedule;
