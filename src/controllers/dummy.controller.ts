// import { Op } from "sequelize";
import { Request, Response } from "express";
import { Dummy } from "../models/index";

// Create and Save a new Dummy
function create(req: Request, res: Response) {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Dummy
  const dummy = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Dummy in the database
  Dummy.create(dummy)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the dummy.",
      });
    });
}

// Retrieve all Dummies from the database.
function findAll(req: Request, res: Response) {
  const title = req.query.title;

  Dummy.findAll({
    where: {
      title: title,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving dummies.",
      });
    });
}

// Find a single Dummy with an id
function findOne(req: Request, res: Response) {
  const id = req.params.id;

  Dummy.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Dummy with id=" + id,
      });
    });
}

// Update a Dummy by the id in the request
function update(req: Request, res: Response) {
  const id = req.params.id;

  Dummy.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dummy was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Dummy with id=${id}. Maybe Dummy was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Dummy with id=" + id,
      });
    });
}

// Delete a Dummy with the specified id in the request
function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Dummy.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dummy was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dummy with id=${id}. Maybe Dummy was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dummy with id=" + id,
      });
    });
}

// Delete all Dummies from the database.
function deleteAll(req: Request, res: Response) {
  Dummy.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Dummies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all dummies.",
      });
    });
}

// find all published Dummy
function findAllPublished(req: Request, res: Response) {
  Dummy.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving dummies.",
      });
    });
}

export {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllPublished,
};
