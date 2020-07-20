import { Request, Response, NextFunction } from "express";
import { User, Business, Favorite } from "../../models";
import {
  InternalServerError,
  UserNotFoundError,
  BusinessNotFoundError,
} from "../../exceptions";

/**
 * Adds a favorite Business to User
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function addFavorite(req: Request, res: Response, next: NextFunction) {
  const { id: userId, businessId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }
      Business.findByPk(businessId).then((business: Business) => {
        if (!business) {
          next(new BusinessNotFoundError(businessId));
          return;
        }

        Favorite.create({
          userId: user.id,
          businessId: business.id,
        }).then((favorite) => {
          return res.status(201).send(favorite);
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default addFavorite;
