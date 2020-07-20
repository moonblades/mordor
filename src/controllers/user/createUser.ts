import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { HttpException, InternalServerError } from "../../exceptions";

/**
 * Create and save a new User
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function createUser(req: Request, res: Response, next: NextFunction) {
  const user = {
    id: req.body.id,
    email: req.body.email,
    displayName: req.body.displayName,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    streetAndNumber: req.body.streetAndNumber,
    city: req.body.city,
    postalCode: req.body.postalCode,
    receiveNotification: req.body.receiveNotification,
    anonymous: req.body.anonymous,
  };

  User.create(user)
    .then((user) => {
      if (!user) {
        next(new HttpException(400, "Unable to create a user"));
        return;
      }
      return res.status(201).send(user);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export default createUser;
