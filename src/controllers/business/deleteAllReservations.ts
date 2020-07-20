import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../exceptions";
import { Reservation } from "../../models";

/**
 * Deletes all reservations for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteAllReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Reservation.destroy({
    where: { businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Reservations were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default deleteAllReservation;
