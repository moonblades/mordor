import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  ReservationNotFoundError,
} from "../../exceptions";
import { Business, Reservation } from "../../models";

function updateReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business
      .hasReservation(parseInt(reservationId, 10))
      .then((value: boolean) => {
        if (!value) {
          next(
            new HttpException(
              403,
              `Reservation ${reservationId} does not belong to Business ${businessId}`
            )
          );
          return;
        }

        Reservation.update(req.body, {
          where: { id: reservationId },
        })
          .then((num) => {
            if (num[0] === 1) {
              return res.status(200).send({
                message: "Reservation was updated successfully.",
              });
            } else {
              if (Object.keys(req.body).length === 0) {
                next(new HttpException(400, "Request's body cannot be empty"));
                return;
              } else {
                next(new ReservationNotFoundError(reservationId));
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

export default updateReservation;
