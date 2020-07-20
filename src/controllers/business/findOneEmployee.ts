import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Employee, Business } from "../../models";

/**
 * Finds an employee for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findOneEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Employee.findByPk(employeeId).then((data) => {
        return res.status(200).send(data);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneEmployee;
