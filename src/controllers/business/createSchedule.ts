import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

function createSchedule(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      const { dayOfWeek, startTime, time } = req.body;

      const schedule = {
        businessId: id,
        dayOfWeek,
        startTime,
        time,
      };

      Schedule.create(schedule).then((schedule) => {
        return res.status(201).send(schedule);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createSchedule;
