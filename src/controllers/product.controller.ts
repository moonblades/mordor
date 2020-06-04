import { Request, Response } from "express";
import { Product } from "../models";

function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.businessId) {
    res.status(400).send({
      message: "businessId can not be empty!",
    });
    return;
  }

  const product = {
    id: req.body.id,
    businessId: req.body.businessId,
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

  Product.create(product)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function findAll(req: Request, res: Response) {
  Product.findAll({})
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
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function update(req: Request, res: Response) {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Product.destroy({
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

function deleteAll(req: Request, res: Response) {
  Product.destroy({
    where: {},
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

export { create, findAll, findOne, update, deleteOne, deleteAll };
