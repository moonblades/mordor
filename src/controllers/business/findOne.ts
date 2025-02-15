import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Business } from "../../models/business.model";

/**
 * Finds a business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  Business.findByPk(id)
    .then((business) => {
      return res.status(200).send(business);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOne;
