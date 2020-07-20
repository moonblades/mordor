import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Business } from "../../models";

/**
 * Creates a product for a business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
        weight: req.body.weight,
        sale: req.body.sale,
        salePercentage: req.body.salePercentage,
        available: req.body.available,
        whenAvailable: req.body.whenAvailable,
      };

      business.createProduct(product).then((product) => {
        return res.status(201).send(product);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createProduct;
