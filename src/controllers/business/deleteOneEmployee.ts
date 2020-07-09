import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  HttpException,
  EmployeeNotFoundError,
} from "../../exceptions";
import { Employee, Business } from "../../models";

function deleteOneEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasEmployee(parseInt(employeeId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Employee ${employeeId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Employee.destroy({
        where: { id: employeeId },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(200).send({
              message: "Employee was deleted successfully!",
            });
          } else {
            next(new EmployeeNotFoundError(employeeId));
            return;
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

export default deleteOneEmployee;
