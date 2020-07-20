import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Product } from "../../models";

/**
 * Finds all products for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAllProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Product.findAll({
    where: { businessId },
  })
    .then((products) => {
      return res.status(200).send(products);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllProduct;
