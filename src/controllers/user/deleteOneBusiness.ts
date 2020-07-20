import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  UserNotFoundError,
} from "../../exceptions";
import { Business, User } from "../../models";

/**
 * Deletes one business for user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteOneBusiness(req: Request, res: Response, next: NextFunction) {
  const { id: userId, businessId } = req.params;

  User.findByPk(userId).then((user: User) => {
    if (!user) {
      next(new UserNotFoundError(userId));
      return;
    }
    user.hasBusiness(parseInt(businessId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Business ${businessId} does not belong to User ${userId}`
          )
        );
        return;
      }

      Business.destroy({
        where: { id: businessId },
      })
        .then((num) => {
          if (num === 1) {
            return res.send({
              message: "Business was deleted successfully!",
            });
          } else {
            next(new BusinessNotFoundError(businessId));
            return;
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

export default deleteOneBusiness;
