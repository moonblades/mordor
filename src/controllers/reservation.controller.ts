import { Request, Response, NextFunction } from "express";
import { Product, Reservation } from "../models";
import {
  InternalServerError,
  ReservationNotFoundError,
  ProductNotFoundError,
} from "../exceptions";

function findAll(req: Request, res: Response, next: NextFunction) {
  Reservation.findAll()
    .then((reservations) => {
      return res.status(200).send(reservations);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOne(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Reservation.findByPk(id)
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function addProduct(req: Request, res: Response, next: NextFunction) {
  const { id: reservationId, productId } = req.params;

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
}

export { findAll, findOne, addProduct };
