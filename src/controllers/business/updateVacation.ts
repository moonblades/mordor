import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  VacationNotFoundError,
  HttpException,
} from "../../exceptions";

/**
 * Updates a vacation for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function updateVacation(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.update(req.body, {
        where: { id: vacationId },
      }).then((num) => {
        if (num[0] === 1) {
          return res.status(200).send({
            message: "Vacation was updated successfully.",
          });
        } else {
          if (Object.keys(req.body).length === 0) {
            next(new HttpException(400, "Request's body cannot be empty"));
            return;
          } else {
            next(new VacationNotFoundError(vacationId));
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

export default updateVacation;
