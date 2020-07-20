import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

/**
 * Deletes one user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        return res.status(200).send({
          message: "User was deleted successfully!",
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

export default deleteOne;
