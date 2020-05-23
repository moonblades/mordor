import { Request, Response } from "express";
import { Business, Reservation } from "../models";

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
  const { id: businessId } = req.params;

  Reservation.findAll({
    where: { businessId: businessId },
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
  const { id: businessId } = req.params;

  Business.findByPk(businessId)
    .then((business: Business) => {
      if (!business) {
        res
          .status(404)
          .send({ message: `Cannot find Business with id ${businessId}.` });
      }

      const reservation = {
        clientId: req.body.clientId,
        date: req.body.date,
        reminderToClient: req.body.reminderToClient,
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
    business.hasReservation(parseInt(reservationId)).then((value: boolean) => {
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
          if (num == 1) {
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
  const { id: businessId, reservationId } = req.params;

  Business.findByPk(businessId).then((business: Business) => {
    business.hasReservation(parseInt(reservationId)).then((value) => {
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
          if (num == 1) {
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
    where: { businessId: businessId },
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
  findAll,
  findOne,
  findAllReservation,
  findOneReservation,
  createReservation,
  updateReservation,
  deleteOneReservation,
  deleteAllReservation,
};
