import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  ProductNotFoundError,
} from "../../exceptions";
import { Business, Product } from "../../models";

function deleteOneProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasProduct(parseInt(productId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Product ${productId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Product.destroy({
        where: { id: productId },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(200).send({
              message: "Product was deleted successfully!",
            });
          } else {
            next(new ProductNotFoundError(productId));
            return;
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

export default deleteOneProduct;
