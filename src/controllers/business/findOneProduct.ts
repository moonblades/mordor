import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Business, Product } from "../../models";

/**
 * Finds a product for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findOneProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Product.findByPk(productId).then((product) => {
        return res.status(200).send(product);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneProduct;
