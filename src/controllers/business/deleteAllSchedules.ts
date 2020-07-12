import { Request, Response, NextFunction } from "express";
import { Business, Schedule } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

function deleteAllSchedules(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Schedule.destroy({
        where: { businessId: business.id },
        truncate: false,
      }).then((nums) => {
        return res.status(200).send({
          message: `${nums} Schedules were deleted successfully!`,
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllSchedules;
