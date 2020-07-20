import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  UserNotFoundError,
} from "../../exceptions";
import { Business, User } from "../../models";

/**
 * Adds a customer to business
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function addCustomer(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, userId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }
      User.findByPk(userId).then((user: User) => {
        if (!user) {
          next(new UserNotFoundError(userId));
          return;
        }

        business.addUser(user);
        return res.status(201).send({
          message: `User ${userId} added to Business ${businessId}`,
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default addCustomer;
