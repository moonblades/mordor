import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import {
  InternalServerError,
  UserNotFoundError,
  HttpException,
} from "../../exceptions";

/**
 * Creates a business for user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createBusiness(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }

      const business = {
        vatNumber: req.body.vatNumber,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        currency: req.body.currency,
        timeZone: req.body.timeZone,
        streetAndNumber: req.body.streetAndNumber,
        postalCode: req.body.postalCode,
        city: req.body.city,
        industry: req.body.industry,
        cancelationTime: req.body.cancelationTime,
      };

      user
        .createBusiness(business)
        .then((business) => {
          return res.status(201).send(business);
        })
        .catch((err) => {
          next(new HttpException(400, `Unable to create a Business: ${err}`));
          return;
        });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createBusiness;
