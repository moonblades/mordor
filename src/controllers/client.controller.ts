import { Request, Response } from "express";
import { Client } from "../models";

// Create and save a new Client
function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!",
    });
    return;
  }

  const client = {
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

  Client.create(client)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
      });
    });
}

// Retrieve all Clients from database by displayName
function findAll(req: Request, res: Response) {
  const displayName = req.query.displayName;

  Client.findAll({
    where: {
      displayName: displayName,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Clients",
      });
    });
}

// Find a single Client
function findOne(req: Request, res: Response) {
  const id = req.params.id;
  Client.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Client with id=" + id,
      });
    });
}

// Update a Client by id in the request
function update(req: Request, res: Response) {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Client with id=" + id,
      });
    });
}

// Delete a Client with the specified id in the request
function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Client.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Client with id=" + id,
      });
    });
}

// Delete all Clients from database
function deleteAll(req: Request, res: Response) {
  Client.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Clients were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clients.",
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
