import { Request, Response } from "express";
import { Vendor, Business } from "../models";

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
  Vendor.findAll({
    where: {},
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

// Create a business for a vendor
function findAllBusinesses(req: Request, res: Response) {
  const { id: vendorId } = req.params;

  Business.findAll({
    where: {
      vendorId: vendorId,
    },
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

// Create a business for a vendor
function createBusiness(req: Request, res: Response) {
  const { id: vendorId } = req.params;

  Vendor.findByPk(vendorId)
    .then((vendor: Vendor) => {
      if (!vendor) {
        res
          .status(404)
          .send({ message: `Cannot find vendor with id ${vendorId}.` });
      }

      const business = {
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

      vendor
        .createBusiness(business)
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
      res.status(500).send({
        message: err.message,
      });
    });
}

function updateBusiness(req: Request, res: Response) {
  const { id: vendorId, businessId } = req.params;

  Vendor.findByPk(vendorId).then((vendor: Vendor) => {
    vendor.hasBusiness(parseInt(businessId)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Business with id ${businessId} not found in vendor with id ${vendorId}`,
        });
        return;
      }

      Business.update(req.body, {
        where: { id: businessId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Business was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Business with id=${businessId}. Maybe Business was not found or req.body is empty!`,
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

function deleteOneBusiness(req: Request, res: Response) {
  const { id: vendorId, businessId } = req.params;

  Vendor.findByPk(vendorId).then((vendor: Vendor) => {
    vendor.hasBusiness(parseInt(businessId)).then((value) => {
      if (!value) {
        res.status(404).send({
          message: `Business with id ${businessId} not found in vendor with id ${vendorId}`,
        });
        return;
      }

      Business.destroy({
        where: { id: businessId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Business was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Business with id=${businessId}. Maybe Business was not found!`,
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

function deleteAllBusinesses(req: Request, res: Response) {
  const { id: vendorId } = req.params;

  Business.destroy({
    where: { vendorId: vendorId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Businesses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
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
  findAllBusinesses,
  createBusiness,
  updateBusiness,
  deleteOneBusiness,
  deleteAllBusinesses,
};
