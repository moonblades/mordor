import { Request, Response } from "express";
import { Business, Reservation, Product, User } from "../models";
import { validationResult } from "express-validator";

function findAll(req: Request, res: Response) {
  //   const displayName = req.query.displayName;

  Business.findAll({
    // where: {
    //   displayName: displayName,
    // },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Businesses",
      });
    });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  Business.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Business with id=" + id,
      });
    });
}

function findAllReservation(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId } = req.params;

  Reservation.findAll({
    where: { businessId },
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
      }

      const reservation = {
        userId: req.body.userId,
        date: req.body.date,
        reminderToUser: req.body.reminderToUser,
        cancelable: req.body.cancelable,
        completed: req.body.completed,
      };

      business
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
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business
      .hasReservation(parseInt(reservationId, 10))
      .then((value: boolean) => {
        if (!value) {
          res.status(404).send({
            message: `Reservation with id ${reservationId} not found in Business with id ${businessId}`,
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Reservation with id ${reservationId} not found in Business with id ${businessId}`,
        });
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num[0] === 1) {
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
  const { id: businessId } = req.params;

  Reservation.destroy({
    where: { businessId },
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

function createProduct(req: Request, res: Response) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
      }

      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
        weight: req.body.weight,
        sale: req.body.sale,
        salePercentage: req.body.salePercentage,
        available: req.body.available,
        whenAvailable: req.body.whenAvailable,
      };

      business
        .createProduct(product)
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

function findAllProduct(req: Request, res: Response) {
  const { id: businessId } = req.params;

  Product.findAll({
    where: { businessId },
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

function findOneProduct(req: Request, res: Response) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
      }

      Product.findByPk(productId)
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

function updateProduct(req: Request, res: Response) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasProduct(parseInt(productId, 10)).then((value: boolean) => {
      if (!value) {
        res.status(404).send({
          message: `Product with id ${productId} not found in Business with id ${businessId}`,
        });
        return;
      }

      Product.update(req.body, {
        where: { id: productId },
      })
        .then((num) => {
          if (num[0] === 1) {
            res.send({
              message: "Product was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Product with id=${productId}. Maybe Product was not found or req.body is empty!`,
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

function deleteOneProduct(req: Request, res: Response) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasProduct(parseInt(productId, 10)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Product with id ${productId} not found in Business with id ${businessId}`,
        });
        return;
      }

      Product.destroy({
        where: { id: productId },
      })
        .then((num) => {
          if (num[0] === 1) {
            res.send({
              message: "Product was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Product with id=${productId}. Maybe Product was not found!`,
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

function deleteAllProduct(req: Request, res: Response) {
  const { id: businessId } = req.params;

  Product.destroy({
    where: { businessId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function addUser(req: Request, res: Response) {
  const { id: businessId, userId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
      }
      User.findByPk(userId)
        .then((user: User) => {
          if (!user) {
            res.status(404).send({
              message: `Cannot find User with id ${userId}.`,
            });
          }

          business.addUser(user);
          res.status(201).send({
            message: `User ${userId} added to Business ${businessId}`,
          });
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

export {
  findAll,
  findOne,
  findAllReservation,
  findOneReservation,
  createReservation,
  updateReservation,
  deleteOneReservation,
  deleteAllReservation,
  createProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
  deleteOneProduct,
  deleteAllProduct,
  addUser,
};
