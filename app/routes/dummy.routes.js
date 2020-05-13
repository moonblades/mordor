module.exports = (app) => {
  const dummy = require("../controllers/dummy.controller.js");

  var router = require("express").Router();

  // Create a new Dummy
  router.post("/", dummy.create);

  // Retrieve all Dummies
  router.get("/", dummy.findAll);

  // Retrieve all published Dummies
  router.get("/published", dummy.findAllPublished);

  // Retrieve a single Dummy with id
  router.get("/:id", dummy.findOne);

  // Update a Dummy with id
  router.put("/:id", dummy.update);

  // Delete a Dummy with id
  router.delete("/:id", dummy.delete);

  // Create a new Dummy
  router.delete("/", dummy.deleteAll);

  app.use("/api/dummy", router);
};
