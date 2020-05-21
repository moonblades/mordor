import { Request, Response } from "express";
import { Business } from "../models";

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

export { findAll, findOne };
