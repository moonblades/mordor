import { Request, Response, NextFunction } from "express";
import {
  ReservationNotFoundError,
  ProductNotFoundError,
  BusinessNotFoundError,
  InternalServerError,
} from "../../exceptions";
import { Reservation, Product, Business } from "../../models";

/**
 * Adds a product to a reservation
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function addProductToReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id: businessId, reservationId, productId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Reservation.findByPk(reservationId).then((reservation: Reservation) => {
        if (!reservation) {
          next(new ReservationNotFoundError(reservationId));
          return;
        }
        Product.findByPk(productId).then((product: Product) => {
          if (!product) {
            next(new ProductNotFoundError(productId));
            return;
          }

          reservation.addProduct(product);
          return res.status(201).send({
            message: `Product ${productId} added to Reservation ${reservationId}`,
          });
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default addProductToReservation;
