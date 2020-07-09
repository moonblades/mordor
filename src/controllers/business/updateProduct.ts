import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  ProductNotFoundError,
} from "../../exceptions";
import { Business, Product } from "../../models";

function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasProduct(parseInt(productId, 10)).then((value: boolean) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Product ${productId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Product.update(req.body, {
        where: { id: productId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Product was updated successfully.",
            });
          } else {
            if (Object.keys(req.body).length === 0) {
              next(new HttpException(400, "Request's body cannot be empty"));
              return;
            } else {
              next(new ProductNotFoundError(productId));
              return;
            }
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

export default updateProduct;
