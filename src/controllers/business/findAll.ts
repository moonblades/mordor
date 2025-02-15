import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Business } from "../../models/business.model";

/**
 * Finds all business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAll(req: Request, res: Response, next: NextFunction) {
  Business.findAll({})
    .then((businesses) => {
      return res.status(200).send(businesses);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAll;
