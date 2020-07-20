import { Request, Response, NextFunction } from "express";
import { User, Favorite } from "../../models";
import { InternalServerError, UserNotFoundError } from "../../exceptions";

/**
 * Finds all favorite businesses for a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function findAllFavorites(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }

      Favorite.findAll({
        where: {
          userId: user.id,
        },
      }).then((favorites) => {
        return res.status(200).send(favorites);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default findAllFavorites;
