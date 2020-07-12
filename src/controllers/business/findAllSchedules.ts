import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

function findAllSchedules(req: Request, res: Response, next: NextFunction) {
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
export default findAllSchedules;
