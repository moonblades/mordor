import { Request, Response, NextFunction } from "express";
import { Business, Reservation, User, Favorite } from "../models";
import {
  HttpException,
  InternalServerError,
  BadRequestError,
  UserNotFoundError,
  ReservationNotFoundError,
  BusinessNotFoundError,
} from "../exceptions";

// Create and save a new User
function create(req: Request, res: Response, next: NextFunction) {
  // TODO: Validate request in middleware
  if (!req.body.email) {
    next(new BadRequestError("Email can not be empty!"));
    return;
  }

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

function findAll(req: Request, res: Response, next: NextFunction) {
  User.findAll()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        next(new UserNotFoundError(id));
        return;
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  User.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(200).send({
          message: "User was updated successfully.",
        });
      } else {
        next(new UserNotFoundError(id));
        return;
      }
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        return res.status(200).send({
          message: "User was deleted successfully!",
        });
      } else {
        next(new UserNotFoundError(id));
        return;
      }
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteAll(req: Request, res: Response, next: NextFunction) {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res
        .status(200)
        .send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAllBusinesses(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Business.findAll({
    where: {
      userId,
    },
  })
    .then((business) => {
      return res.status(200).send(business);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

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
          next(new HttpException(400, "Unable to create a Business"));
          return;
        });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

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
            `Business ${businessId} do not belong to User ${userId}`
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
            // TODO: not needed? Business existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot update Business with id=${businessId}. Maybe Business was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

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
            `Business ${businessId} do not belong to User ${userId}`
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
            // TODO: not needed? Business existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot delete Business with id=${businessId}. Maybe Business was not found!`,
            });
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

function deleteAllBusinesses(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Business.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Businesses were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAllReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Reservation.findAll({
    where: { userId },
  })
    .then((reservation) => {
      return res.send(reservation);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        next(new UserNotFoundError(userId));
        return;
      }

      Reservation.findByPk(reservationId).then((reservation) => {
        return res.send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

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

function updateReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    if (!user) {
      next(new UserNotFoundError(userId));
      return;
    }
    user.hasReservation(parseInt(reservationId, 10)).then((value: boolean) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} do not belong to User ${userId}`
          )
        );
        return;
      }

      Reservation.update(req.body, {
        where: { id: reservationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Reservation was updated successfully.",
            });
          } else {
            // TODO: not needed? Reservation existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot update Reservation with id=${reservationId}. Maybe Reservation was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

function deleteOneReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    if (!user) {
      next(new UserNotFoundError(userId));
      return;
    }
    user.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} do not belong to User ${userId}`
          )
        );
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num === 1) {
            return res.send({
              message: "Reservation was deleted successfully!",
            });
          } else {
            // TODO: not needed? Reservation existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot delete Reservation with id=${reservationId}. Maybe Reservation was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          next(new InternalServerError(err.message));
          return;
        });
    });
  });
}

function deleteAllReservation(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.params;

  Reservation.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Reservations were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

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

export {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllReservation,
  findOneReservation,
  createReservation,
  updateReservation,
  deleteOneReservation,
  deleteAllReservation,
  findAllBusinesses,
  createBusiness,
  updateBusiness,
  deleteOneBusiness,
  deleteAllBusinesses,
  addFavorite,
  findAllFavorites,
};
