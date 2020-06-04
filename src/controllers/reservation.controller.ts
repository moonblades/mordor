import { Request, Response } from "express";
import { Product, Reservation } from "../models";

function findAll(req: Request, res: Response) {
  Reservation.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function findOne(req: Request, res: Response) {
  const { id } = req.params;

  Reservation.findByPk(id)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function addProduct(req: Request, res: Response) {
  const { id: reservationId, productId } = req.params;

  Reservation.findByPk(reservationId).then((reservation: Reservation) => {
    if (!reservation) {
      return res
        .status(404)
        .send({ message: `Cannot find reservation with id ${reservationId}.` });
    }
    Product.findByPk(productId).then((product: Product) => {
      if (!product) {
        return res
          .status(404)
          .send({ message: `Cannot find product with id ${productId}.` });
      }

      reservation.addProduct(product);
      return res.status(201).send({
        message: `Product ${productId} added to Reservation ${reservationId}`,
      });
    });
  });
}

// function removeProduct(req: Request, res: Response) {
//   const { id: reservationId, productId } = req.params;

//   Reservation.findByPk(reservationId).then((reservation: Reservation) => {
//     if (!reservation) {
//      return res
//         .status(404)
//         .send({ message: `Cannot find reservation with id ${reservationId}.` });
//     }
//     Product.findByPk(productId).then((product: Product) => {
//       if (!product) {
//        return res
//           .status(404)
//           .send({ message: `Cannot find product with id ${productId}.` });
//       }

//       return res.status(201).send({
//         message: `Product ${productId} deleted from Reservation ${reservationId}`,
//       });
//     });
//   });
// }

export { findAll, findOne, addProduct };
