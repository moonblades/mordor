import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        next(new UserNotFoundError(id));
        return;
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOne;
