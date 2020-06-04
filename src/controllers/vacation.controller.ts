import { Request, Response } from "express";
import { Business, Vacation } from "../models";

function create(req: Request, res: Response) {
  // Validate request
  if (!req.params.id) {
    return res.status(400).send({
      message: "BusinessId can not be empty!",
    });
    return;
  }
  const { dateStart, dateEnd } = req.body;

  const vacation = {
    businessId: req.params.id,
    dateStart,
    dateEnd,
  };

  Vacation.create(vacation)
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function findAll(req: Request, res: Response) {
  const id = req.params.id;

  Vacation.findAll({
    where: {
      businessId: id,
    },
  })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function findOne(req: Request, res: Response) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Vacation.findByPk(vacationId).then((vacation: Vacation) => {
        if (!vacation) {
          return res.status(404).send({
            message: "Vacation with id " + vacationId + " not found!",
          });
          return;
        }
        return res.send(vacation);
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function update(req: Request, res: Response) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Vacation.update(req.body, {
        where: { id: vacationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Vacation was updated successfully.",
            });
          } else {
            return res.send({
              message: `Cannot update Vacation with id=${vacationId}. Maybe Vacation was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function deleteOne(req: Request, res: Response) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Vacation.destroy({
        where: { id: vacationId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Vacation was deleted successfully.",
            });
          } else {
            return res.send({
              message: `Cannot delete Vacation with id=${vacationId}. Maybe Vacation was not found!`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function deleteAll(req: Request, res: Response) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      business
        .getVacations()
        .then((vacations: Vacation[]) => {
          vacations.forEach((vacation) => {
            vacation
              .destroy()
              .then((num) => {
                if (num[0] === 1) {
                  return res.send({
                    message: "Vacation was deleted successfully.",
                  });
                } else {
                  return res.send({
                    message: `Cannot delete Vacation with vacationId=${vacation.id}. Maybe Vacation was not found!`,
                  });
                }
              })
              .catch((err) => {
                return res.status(500).send({
                  message: err.message,
                });
              });
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });

  Vacation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Vacations were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vacations.",
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
