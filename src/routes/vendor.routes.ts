import { Express, Router } from "express";
import * as vendor from "../controllers/vendor.controller";

function init(app: Express) {
  var router = Router();

  // Create a new Vendor
  router.post("/", vendor.create);

  // Retrieve all Vendors
  router.get("/", vendor.findAll);

  // Retrieve a single Vendor with id
  router.get("/:id", vendor.findOne);

  // Update a Vendor with id
  router.put("/:id", vendor.update);

  // Delete a Vendor with id
  router.delete("/:id", vendor.deleteOne);

  // Delete all Vendors
  router.delete("/", vendor.deleteAll);

  // Retrieve all business for vendor
  router.get("/:id/business", vendor.findAllBusinesses);

  // Create business for vendor
  router.post("/:id/business", vendor.createBusiness);

  // Update business for vendor
  router.put("/:id/business/:businessId", vendor.updateBusiness);

  // Delete business for vendor
  router.delete("/:id/business/:businessId", vendor.deleteOneBusiness);

  // Delete all businesses for vendor
  router.delete("/:id/business", vendor.deleteAllBusinesses);

  app.use("/api/vendor", router);
}

export { init };
