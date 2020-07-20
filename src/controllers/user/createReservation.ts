import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

/**
 * Creates a reservation for user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }

      const reservation = {
        businessId: req.body.businessId,
        date: req.body.date,
        reminderToUser: req.body.reminderToUser,
        cancelable: req.body.cancelable,
        completed: req.body.completed,
      };

      user.createReservation(reservation).then((data) => {
        return res.status(201).send(data);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createReservation;
