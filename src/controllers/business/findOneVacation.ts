import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  VacationNotFoundError,
} from "../../exceptions";

function findOneVacation(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.findByPk(vacationId).then((vacation: Vacation) => {
        if (!vacation) {
          next(new VacationNotFoundError(vacationId));
          return;
        }

        return res.status(200).send(vacation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneVacation;
