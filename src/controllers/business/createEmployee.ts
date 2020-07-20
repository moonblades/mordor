import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Business } from "../../models";

/**
 * Creates an employee for a business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      const employee = {
        name: req.body.name,
        surname: req.body.surname,
      };

      business.createEmployee(employee).then((employee) => {
        return res.status(201).send(employee);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createEmployee;
