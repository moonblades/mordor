import { Request, Response, NextFunction } from "express";
import { Reservation, User } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

function findOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }

      Reservation.findByPk(reservationId).then((reservation) => {
        return res.send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findOneReservation;
