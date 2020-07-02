import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Business, Product, Reservation, User, Employee } from "../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  HttpException,
  UserNotFoundError,
} from "../exceptions";
import { employee } from "../test/testdata";

function findAll(req: Request, res: Response, next: NextFunction) {
  Business.findAll({})
    .then((businesses) => {
      return res.status(200).send(businesses);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  Business.findByPk(id)
    .then((business) => {
      return res.status(200).send(business);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAllReservation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId } = req.params;

  Reservation.findAll({
    where: { businessId },
  })
    .then((reservations) => {
      return res.status(200).send(reservations);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOneReservation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Reservation.findByPk(reservationId).then((reservation) => {
        return res.status(200).send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function createReservation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      const reservation = {
        userId: req.body.userId,
        date: req.body.date,
        reminderToUser: req.body.reminderToUser,
        cancelable: req.body.cancelable,
        completed: req.body.completed,
      };

      business.createReservation(reservation).then((reservation) => {
        return res.status(201).send(reservation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function updateReservation(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business
      .hasReservation(parseInt(reservationId, 10))
      .then((value: boolean) => {
        if (!value) {
          next(
            new HttpException(
              403,
              `Reservation ${reservationId} does not belong to Business ${businessId}`
            )
          );
          return;
        }

        Reservation.update(req.body, {
          where: { id: reservationId },
        })
          .then((num) => {
            if (num[0] === 1) {
              return res.status(200).send({
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasReservation(parseInt(reservationId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Reservation ${reservationId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Reservation.destroy({
        where: { id: reservationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Reservation was deleted successfully!",
            });
          } else {
            // TODO: not needed? Reservation existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot delete Reservation with id=${reservationId}. Maybe Reservation was not found!`,
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
  const { id: businessId } = req.params;

  Reservation.destroy({
    where: { businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Reservations were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function createProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
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

      business.createProduct(product).then((product) => {
        return res.status(201).send(product);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAllProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Product.findAll({
    where: { businessId },
  })
    .then((products) => {
      return res.status(200).send(products);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOneProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Product.findByPk(productId).then((product) => {
        return res.status(200).send(product);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasProduct(parseInt(productId, 10)).then((value: boolean) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Product ${productId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Product.update(req.body, {
        where: { id: productId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Product was updated successfully.",
            });
          } else {
            // TODO: not needed? Product existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot update Product with id=${productId}. Maybe Product was not found or req.body is empty!`,
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

function deleteOneProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, productId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business.hasProduct(parseInt(productId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Product ${productId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Product.destroy({
        where: { id: productId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Product was deleted successfully!",
            });
          } else {
            // TODO: not needed? Product existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot delete Product with id=${productId}. Maybe Product was not found!`,
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

function deleteAllProduct(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Product.destroy({
    where: { businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Products were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function createEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      const employee = {
        name: req.body.name,
        surname: req.body.surname,
      };

      business.createEmployee(employee).then((employee) => {
        return res.status(201).send(employee);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAllEmployees(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Employee.findAll({ where: { businessId } })
    .then((employees) => {
      return res.status(200).send(employees);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOneEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(businessId));
        return;
      }

      Employee.findByPk(employeeId).then((data) => {
        return res.status(200).send(data);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function updateEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(businessId));
      return;
    }
    business
      .hasEmployee(parseInt(employeeId, 10))
      .then((value: boolean) => {
        if (!value) {
          next(
            new HttpException(
              403,
              `Employee ${employeeId} does not belong to Business ${businessId}`
            )
          );
          return;
        }

        Employee.update(req.body, { where: { id: employeeId } }).then((num) => {
          if (num[0] === 1) {
            return res.status(200).send({
              message: "Employee was updated successfully.",
            });
          } else {
            // TODO: not needed? Employee existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot update Employee with id=${employeeId}. Maybe Employee was not found or req.body is empty!`,
            });
          }
        });
      })
      .catch((err) => {
        next(new InternalServerError(err.message));
        return;
      });
  });
}

function deleteOneEmployee(req: Request, res: Response, next: NextFunction) {
  const { id: businessId, employeeId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasEmployee(parseInt(employeeId, 10)).then((value) => {
      if (!value) {
        next(
          new HttpException(
            403,
            `Employee ${employeeId} does not belong to Business ${businessId}`
          )
        );
        return;
      }

      Employee.destroy({
        where: { id: employeeId },
      })
        .then((num) => {
          if (num === 1) {
            return res.status(200).send({
              message: "Employee was deleted successfully!",
            });
          } else {
            // TODO: not needed? Employee existance checked before, req.body should be validate in validation middleware
            return res.send({
              message: `Cannot delete Employee with id=${employeeId}. Maybe Employee was not found!`,
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

function deleteAllEmployees(req: Request, res: Response, next: NextFunction) {
  const { id: businessId } = req.params;

  Employee.destroy({
    where: { businessId: businessId },
    truncate: false,
  })
    .then((nums) => {
      return res.status(200).send({
        message: `${nums} Employee were deleted successfully!`,
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

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
  findAllEmployees,
  findOneEmployee,
  createEmployee,
  updateEmployee,
  deleteOneEmployee,
  deleteAllEmployees,
  addCustomer as addUser,
};
