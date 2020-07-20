import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Product } from "../../models";

/**
 * Deletes all products for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteAllProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Product.destroy({
    where: { businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Products were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllProduct;
