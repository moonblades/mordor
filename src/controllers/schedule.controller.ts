import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../models";
import {
  HttpException,
  InternalServerError,
  BusinessNotFoundError,
  ScheduleNotFoundError,
} from "../exceptions";

function create(req: Request, res: Response, next: NextFunction) {
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

function findAll(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }
      Schedule.findAll({
        where: {
          businessId: id,
        },
      }).then((schedules) => {
        return res.status(200).send(schedules);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOne(req: Request, res: Response, next: NextFunction) {
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

function update(req: Request, res: Response, next: NextFunction) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Schedule.update(req.body, {
        where: { id: scheduleId },
      }).then((num) => {
        if (num[0] === 1) {
          return res.status(200).send({
            message: "Schedule was updated successfully.",
          });
        } else {
          if (Object.keys(req.body).length === 0) {
            next(new HttpException(400, "Request's body cannot be empty"));
            return;
          } else {
            next(new ScheduleNotFoundError(scheduleId));
            return;
          }
        }
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Schedule.destroy({
        where: { id: scheduleId },
      }).then((num) => {
        if (num[0] === 1) {
          return res.send({
            message: "Schedule was deleted successfully.",
          });
        } else {
          next(new ScheduleNotFoundError(scheduleId));
          return;
        }
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteAll(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Schedule.destroy({
        where: { businessId: business.id },
        truncate: false,
      }).then((nums) => {
        return res.status(200).send({
          message: `${nums} Schedules were deleted successfully!`,
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
