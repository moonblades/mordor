import { Request, Response } from "express";
import { Business, Schedule } from "../models";

function create(req: Request, res: Response) {
  // Validate request
  if (!req.params.id) {
    return res.status(400).send({
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

  Schedule.findAll({
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
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.findByPk(scheduleId).then((schedule: Schedule) => {
        if (!schedule) {
          return res.status(404).send({
            message: "Schedule with id " + scheduleId + " not found!",
          });
          return;
        }
        return res.send(schedule);
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

function update(req: Request, res: Response) {
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.update(req.body, {
        where: { id: scheduleId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Schedule was updated successfully.",
            });
          } else {
            return res.send({
              message: `Cannot update Schedule with id=${scheduleId}. Maybe Schedule was not found or req.body is empty!`,
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
  const { id, scheduleId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        return res.status(404).send({
          message: "Error retrieving Business with id=" + id,
        });

        return;
      }

      Schedule.destroy({
        where: { id: scheduleId },
      })
        .then((num) => {
          if (num[0] === 1) {
            return res.send({
              message: "Schedule was deleted successfully.",
            });
          } else {
            return res.send({
              message: `Cannot delete Schedule with id=${scheduleId}. Maybe Schedule was not found!`,
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
        .getSchedules()
        .then((schedules: Schedule[]) => {
          schedules.forEach((schedule) => {
            schedule
              .destroy()
              .then((num) => {
                if (num[0] === 1) {
                  return res.send({
                    message: "Schedule was deleted successfully.",
                  });
                } else {
                  return res.send({
                    message: `Cannot delete Schedule with scheduleId=${schedule.id}. Maybe Schedule was not found!`,
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

  Schedule.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Schedules were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
