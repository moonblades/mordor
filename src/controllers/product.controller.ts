import { Request, Response, NextFunction } from "express";
import { Product } from "../models";
import {
  HttpException,
  InternalServerError,
  ProductNotFoundError,
} from "../exceptions";

function create(req: Request, res: Response, next: NextFunction) {
  // Validate request
  if (!req.body.businessId) {
    next(new HttpException(400, "businessId can not be empty!"));
    return;
  }

  const product = {
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
    .then((product) => {
      return res.status(201).send(product);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findAll(req: Request, res: Response, next: NextFunction) {
  Product.findAll()
    .then((products) => {
      return res.status(200).send(products);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Product.findByPk(id)
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(200).send({
          message: "Product was updated successfully.",
        });
      } else {
        if (Object.keys(req.body).length === 0) {
          next(new HttpException(400, "Request's body cannot be empty"));
          return;
        } else {
          next(new ProductNotFoundError(id));
          return;
        }
      }
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Product.destroy({
    where: { id },
  })
    .then((num) => {
      if (num[0] === 1) {
        return res.status(200).send({
          message: "Product was deleted successfully!",
        });
      } else {
        next(new ProductNotFoundError(id));
        return;
      }
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteAll(req: Request, res: Response, next: NextFunction) {
  Product.destroy({
    where: {},
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

export { create, findAll, findOne, update, deleteOne, deleteAll };
