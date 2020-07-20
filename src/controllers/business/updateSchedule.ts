import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  ScheduleNotFoundError,
  HttpException,
} from "../../exceptions";

/**
 * Updates a schedule for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function updateSchedule(req: Request, res: Response, next: NextFunction) {
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

export default updateSchedule;
