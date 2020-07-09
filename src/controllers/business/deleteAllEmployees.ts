import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Employee } from "../../models";

function deleteAllEmployees(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Employee.destroy({
    where: { businessId: businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Employee were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllEmployees;
