import { Request, Response, NextFunction } from "express";
import { Reservation } from "../../models";
import { InternalServerError } from "../../exceptions";

/**
 * Finds all reservations for a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAllReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Reservation.findAll({
    where: { userId },
  })
    .then((reservations) => {
      return res.send(reservations);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllReservation;
