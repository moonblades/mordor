import { Request, Response, NextFunction } from "express";
import { User, Business } from "../../models";
import {
  InternalServerError,
  UserNotFoundError,
  HttpException,
  BusinessNotFoundError,
} from "../../exceptions";

function updateBusiness(req: Request, res: Response, next: NextFunction) {
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

      Business.update(req.body, {
        where: { id: businessId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Business was updated successfully.",
            });
          } else {
            if (Object.keys(req.body).length === 0) {
              next(new HttpException(400, "Request's body cannot be empty"));
              return;
            } else {
              next(new BusinessNotFoundError(businessId));
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

export default updateBusiness;
