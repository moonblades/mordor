import { Request, Response, NextFunction } from "express";
import { User, Reservation } from "../../models";
import {
  InternalServerError,
  UserNotFoundError,
  HttpException,
  ReservationNotFoundError,
} from "../../exceptions";

/**
 * Updates a reservation for a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function updateReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    if (!user) {
      next(new UserNotFoundError(userId));
      return;
    }
    user.hasReservation(parseInt(reservationId, 10)).then((value: boolean) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} does not belong to User ${userId}`
          )
        );
        return;
      }

      Reservation.update(req.body, {
        where: { id: reservationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
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
