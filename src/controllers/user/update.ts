import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

/**
 * Updates a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  User.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(200).send({
          message: "User was updated successfully.",
        });
      } else {
        next(new UserNotFoundError(id));
        return;
      }
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default update;
