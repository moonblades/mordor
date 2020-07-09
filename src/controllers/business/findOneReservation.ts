import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Business, Reservation } from "../../models";

function findOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Reservation.findByPk(reservationId).then((reservation) => {
        return res.status(200).send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneReservation;
