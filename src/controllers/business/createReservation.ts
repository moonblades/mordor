import { Request, Response, NextFunction } from "express";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";
import { Business } from "../../models";

/**
 * Creates a reservation for business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      const reservation = {
        userId: req.body.userId,
        date: req.body.date,
        reminderToUser: req.body.reminderToUser,
        cancelable: req.body.cancelable,
        completed: req.body.completed,
      };

      business.createReservation(reservation).then((reservation) => {
        return res.status(201).send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createReservation;
