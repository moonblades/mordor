import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError } from "../../exceptions";

function findAll(req: Request, res: Response, next: NextFunction) {
  User.findAll()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAll;
