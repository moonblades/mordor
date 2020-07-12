import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError } from "../../exceptions";

function deleteAll(req: Request, res: Response, next: NextFunction) {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res
        .status(200)
        .send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAll;
