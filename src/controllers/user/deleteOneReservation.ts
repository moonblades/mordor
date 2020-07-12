import { Request, Response, NextFunction } from "express";
import { User, Reservation } from "../../models";
import {
  InternalServerError,
  UserNotFoundError,
  HttpException,
  ReservationNotFoundError,
} from "../../exceptions";

function deleteOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    if (!user) {
      next(new UserNotFoundError(userId));
      return;
    }
    user.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} does not belong to User ${userId}`
          )
        );
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num === 1) {
            return res.send({
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
