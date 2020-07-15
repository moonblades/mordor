import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  VacationNotFoundError,
} from "../../exceptions";

function deleteOneVacation(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.destroy({
        where: { id: vacationId },
      }).then((num) => {
        if (num === 1) {
          return res.status(200).send({
            message: "Vacation was deleted successfully.",
          });
        } else {
          next(new VacationNotFoundError(vacationId));
          return;
        }
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteOneVacation;
