import { Request, Response } from "express";
import { Vendor } from "../models";

// Create and Save a new Vendor
function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!",
    });
    return;
  }

  const vendor = {
    email: req.body.email,
    displayName: req.body.displayName,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  };

  Vendor.create(vendor)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vendor.",
      });
    });
}

// Retrieve all Vendors from database
function findAll(req: Request, res: Response) {
  const displayName = req.query.displayName;

  Vendor.findAll({
    where: {
      displayName: displayName,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vendors",
      });
    });
}

// Find a single vendor
function findOne(req: Request, res: Response) {
  const id = req.params.id;
  Vendor.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Vendor with id=" + id,
      });
    });
}

// Update a Vendor by id in the request
function update(req: Request, res: Response) {
  const id = req.params.id;

  Vendor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendor was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Vendor with id=${id}. Maybe Vendor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Vendor with id=" + id,
      });
    });
}

// Delete a Vendor with the specified id in the request
function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Vendor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Vendor with id=" + id,
      });
    });
}

// Delete all Vendors from database
function deleteAll(req: Request, res: Response) {
  Vendor.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} vendors were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vendors.",
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
