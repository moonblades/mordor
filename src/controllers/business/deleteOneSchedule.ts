import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  ScheduleNotFoundError,
} from "../../exceptions";

function deleteOneSchedule(req: Request, res: Response, next: NextFunction) {
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
        if (num === 1) {
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

export default deleteOneSchedule;
