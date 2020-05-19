import { Request, Response } from "express";
import { Business } from "../models";

function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.vendorId) {
    res.status(400).send({
      message: "VendorId can not be empty!",
    });
    return;
  }

  const business = {
    id: req.body.id,
    vendorId: req.body.vendorId,
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
  };

  Business.create(business)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the business.",
      });
    });
}

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

function update(req: Request, res: Response) {
  const id = req.params.id;

  Business.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Business was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Business with id=${id}. Maybe Business was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Business with id=" + id,
      });
    });
}

function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Business.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Business was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Business with id=${id}. Maybe Business was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Business with id=" + id,
      });
    });
}

function deleteAll(req: Request, res: Response) {
  Business.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Businesses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Businesses.",
      });
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
