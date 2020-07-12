import { Request, Response, NextFunction } from "express";
import { Business } from "../../models";
import { InternalServerError } from "../../exceptions";

function deleteAllBusinesses(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Business.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Businesses were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllBusinesses;
