import { Request, Response } from "express";
import { Reservation } from "../models";

function findAll(req: Request, res: Response) {
  Reservation.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function findOne(req: Request, res: Response) {
  const { id } = req.params;

  Reservation.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

export { findAll, findOne };
