import { Request, Response } from "express";
import { User, Reservation, Business } from "../models";

// Create and save a new User
function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!",
    });
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
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
}

// Retrieve all Users from database by displayName
function findAll(req: Request, res: Response) {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users",
      });
    });
}

// Find a single User
function findOne(req: Request, res: Response) {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id=" + id,
      });
    });
}

// Update a User by id in the request
function update(req: Request, res: Response) {
  const id = req.params.id;

  User.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + id,
      });
    });
}

// Delete a User with the specified id in the request
function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id=" + id,
      });
    });
}

// Delete all Users from database
function deleteAll(req: Request, res: Response) {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
}

// Create a business for a user
function findAllBusinesses(req: Request, res: Response) {
  const { id: userId } = req.params;

  Business.findAll({
    where: {
      userId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

// Create a business for a user
function createBusiness(req: Request, res: Response) {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `Cannot find user with id ${userId}.` });
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
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function updateBusiness(req: Request, res: Response) {
  const { id: userId, businessId } = req.params;

  User.findByPk(userId).then((user: User) => {
    user.hasBusiness(parseInt(businessId, 10)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Business with id ${businessId} not found in user with id ${userId}`,
        });
        return;
      }

      Business.update(req.body, {
        where: { id: businessId },
      })
        .then((num) => {
          if (num[0] === 1) {
            res.send({
              message: "Business was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Business with id=${businessId}. Maybe Business was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    });
  });
}

function deleteOneBusiness(req: Request, res: Response) {
  const { id: userId, businessId } = req.params;

  User.findByPk(userId).then((user: User) => {
    user.hasBusiness(parseInt(businessId, 10)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Business with id ${businessId} not found in user with id ${userId}`,
        });
        return;
      }

      Business.destroy({
        where: { id: businessId },
      })
        .then((num) => {
          if (num === 1) {
            res.send({
              message: "Business was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Business with id=${businessId}. Maybe Business was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    });
  });
}

function deleteAllBusinesses(req: Request, res: Response) {
  const { id: userId } = req.params;

  Business.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Businesses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function findAllReservation(req: Request, res: Response) {
  const { id: userId } = req.params;

  Reservation.findAll({
    where: { userId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function findOneReservation(req: Request, res: Response) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `Cannot find user with id ${userId}.` });
      }

      Reservation.findByPk(reservationId)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

function createReservation(req: Request, res: Response) {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then((user: User) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `Cannot find user with id ${userId}.` });
      }

      const reservation = {
        businessId: req.body.businessId,
        date: req.body.date,
        reminderToUser: req.body.reminderToUser,
        cancelable: req.body.cancelable,
        completed: req.body.completed,
      };

      user
        .createReservation(reservation)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

function updateReservation(req: Request, res: Response) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    user.hasReservation(parseInt(reservationId, 10)).then((value: boolean) => {
      if (!value) {
        res.status(404).send({
          message: `Reservation with id ${reservationId} not found in user with id ${userId}`,
        });
        return;
      }

      Reservation.update(req.body, {
        where: { id: reservationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            res.send({
              message: "Reservation was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Reservation with id=${reservationId}. Maybe Reservation was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    });
  });
}

function deleteOneReservation(req: Request, res: Response) {
  const { id: userId, reservationId } = req.params;

  User.findByPk(userId).then((user: User) => {
    user.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Reservation with id ${reservationId} not found in user with id ${userId}`,
        });
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num === 1) {
            res.send({
              message: "Reservation was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Reservation with id=${reservationId}. Maybe Reservation was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    });
  });
}

function deleteAllReservation(req: Request, res: Response) {
  const { id: userId } = req.params;

  Reservation.destroy({
    where: { userId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Reservations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
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
};
