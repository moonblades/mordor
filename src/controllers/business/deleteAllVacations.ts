import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

/**
 * Deletes all vacations for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteAllVacations(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }
      Vacation.destroy({
        where: { businessId: business.id },
        truncate: false,
      }).then((nums) => {
        return res.status(200).send({
          message: `${nums} Vacations were deleted successfully!`,
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllVacations;
