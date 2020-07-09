import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Employee } from "../../models";

function findAllEmployees(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Employee.findAll({ where: { businessId } })
    .then((employees) => {
      return res.status(200).send(employees);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllEmployees;
