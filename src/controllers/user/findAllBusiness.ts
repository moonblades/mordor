import { Request, Response, NextFunction } from "express";
import { Business } from "../../models";
import { InternalServerError } from "../../exceptions";

/**
 * Finds all businesses for a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAllBusinesses(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Business.findAll({
    where: {
      userId,
    },
  })
    .then((businesses) => {
      return res.status(200).send(businesses);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllBusinesses;
