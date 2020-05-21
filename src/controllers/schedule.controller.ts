import { Request, Response } from "express";
import { Schedule, Business } from "../models";

function create(req: Request, res: Response) {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: "BusinessId can not be empty!",
    });
    return;
  }

  const { dayOfWeek, startTime, time } = req.body;

  const schedule = {
    businessId: req.params.id,
    dayOfWeek,
    startTime,
    time,
  };

  Schedule.create(schedule)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule.",
      });
    });
}

function findAll(req: Request, res: Response) {
  const id = req.params.id;

  Schedule.findAll({
    where: {
      businessId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules",
      });
    });
}

function findOne(req: Request, res: Response) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.findByPk(scheduleId).then((schedule: Schedule) => {
        if (!schedule) {
          res.status(404).send({
            message: "Schedule with id " + scheduleId + " not found!",
          });
          return;
        }
        res.send(schedule);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function update(req: Request, res: Response) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.update(req.body, {
        where: { id: scheduleId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Schedule was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Schedule with id=${scheduleId}. Maybe Schedule was not found or req.body is empty!`,
            });
          }
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

function deleteOne(req: Request, res: Response) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.destroy({
        where: { id: scheduleId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Schedule was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete Schedule with id=${scheduleId}. Maybe Schedule was not found!`,
            });
          }
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

function deleteAll(req: Request, res: Response) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      business
        .getSchedules()
        .then((schedules: Schedule[]) => {
          schedules.forEach((schedule) => {
            schedule
              .destroy()
              .then((num) => {
                if (num == 1) {
                  res.send({
                    message: "Schedule was deleted successfully.",
                  });
                } else {
                  res.send({
                    message: `Cannot delete Schedule with scheduleId=${schedule.id}. Maybe Schedule was not found!`,
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "Error deleting Schedules",
                });
              });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error deleting Schedules",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Schedules",
      });
    });

  Schedule.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Schedules were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Schedules.",
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
