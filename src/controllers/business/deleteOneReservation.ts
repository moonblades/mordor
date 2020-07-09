import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  ReservationNotFoundError,
} from "../../exceptions";
import { Business, Reservation } from "../../models";

function deleteOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(200).send({
              message: "Reservation was deleted successfully!",
            });
          } else {
            next(new ReservationNotFoundError(reservationId));
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

export default deleteOneReservation;
