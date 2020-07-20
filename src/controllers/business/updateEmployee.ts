import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  EmployeeNotFoundError,
} from "../../exceptions";
import { Employee, Business } from "../../models";

/**
 * Updates an employee
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function updateEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business
      .hasEmployee(parseInt(employeeId, 10))
      .then((value: boolean) => {
        if (!value) {
          next(
            new HttpException(
              403,
              `Employee ${employeeId} does not belong to Business ${businessId}`
            )
          );
          return;
        }

        Employee.update(req.body, { where: { id: employeeId } }).then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Employee was updated successfully.",
            });
          } else {
            if (Object.keys(req.body).length === 0) {
              next(new HttpException(400, "Request's body cannot be empty"));
              return;
            } else {
              next(new EmployeeNotFoundError(employeeId));
              return;
            }
          }
        });
      })
      .catch((err) => {
        next(new InternalServerError(err.message));
        return;
      });
  });
}

export default updateEmployee;
