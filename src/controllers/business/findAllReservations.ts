import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Reservation } from "../../models/reservation.model";

function findAllReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Reservation.findAll({
    where: { businessId },
  })
    .then((reservations) => {
      return res.status(200).send(reservations);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllReservation;
