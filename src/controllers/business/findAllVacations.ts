import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

/**
 * Finds all vacations for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAllVacations(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Business.findByPk(id).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(id));
      return;
    }

    Vacation.findAll({
      where: {
        businessId: id,
      },
    })
      .then((vacations) => {
        return res.send(vacations);
      })
      .catch((err) => {
        next(new InternalServerError(err.message));
        return;
      });
  });
}

export default findAllVacations;
