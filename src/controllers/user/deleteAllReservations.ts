import { Request, Response, NextFunction } from "express";
import { Reservation } from "../../models";
import { InternalServerError } from "../../exceptions";

/**
 * Deletes all reservations for user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteAllReservations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id: userId } = req.params;

  Reservation.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Reservations were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllReservations;
