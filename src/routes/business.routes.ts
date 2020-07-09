import { Express, Router } from "express";
import { param } from "express-validator";
import { typeValidation } from "../middlewares/validation";
import { productSchema } from "../schemas/product_schema";
import { reservationSchema } from "../schemas/reservation.schema";
import * as business from "../controllers/business";

function init(app: Express) {
  const router = Router();

  // Retrieve all businesss
  router.get("/", business.findAll);

  // Retrieve a single business with id
  router.get(
    "/:id",
    [param("id").isNumeric()],
    typeValidation,
    business.findOne
  );

  // Create a new reservation for business
  router.post(
    "/:id/reservation",
    reservationSchema(),
    typeValidation,
    business.createReservation
  );

  // Retrieve all reservation for business
  router.get(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    business.findAllReservations
  );

  // Retrieve a reservation for business
  router.get(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    business.findOneReservation
  );

  // Update a reservation for business
  router.put(
    "/:id/reservation/:reservationId",
    reservationSchema(),
    typeValidation,
    business.updateReservation
  );

  // Delete a reservation for business
  router.delete(
    "/:id/reservation/:reservationId",
    [param("id").isNumeric(), param("reservationId").isNumeric()],
    typeValidation,
    business.deleteOneReservation
  );

  // Delte all reservation for business
  router.delete(
    "/:id/reservation",
    [param("id").isNumeric()],
    typeValidation,
    business.deleteAllReservations
  );

  // Create a new product for business
  router.post(
    "/:id/product",
    productSchema(),
    typeValidation,
    business.createProduct
  );

  // Retrieve all product for business
  router.get(
    "/:id/product",
    [param("id").isNumeric()],
    typeValidation,
    business.findAllProducts
  );

  // Retrieve a product for business
  router.get(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.findOneProduct
  );

  // Update a product for business
  router.put(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.updateProduct
  );

  // Delete a product for business
  router.delete(
    "/:id/product/:productId",
    [param("id").isNumeric(), param("productId").isNumeric()],
    typeValidation,
    business.deleteOneProduct
  );

  // Delte all product for business
  router.delete(
    "/:id/product",
    [param("id").isNumeric()],
    typeValidation,
    business.deleteAllProducts
  );

  // Retrieve all employee for business
  router.get(
    "/:id/employee",
    [param("id").isNumeric()],
    typeValidation,
    business.findAllEmployees
  );

  // Retrieve an employee for business
  router.get(
    "/:id/employee/:employeeId",
    [param("id").isNumeric(), param("employeeId").isNumeric()],
    typeValidation,
    business.findOneEmployee
  );

  // Create an employee for business
  router.post(
    "/:id/employee",
    [param("id").isNumeric()],
    typeValidation,
    business.createEmployee
  );

  // Update an employee for business
  router.put(
    "/:id/employee/:employeeId",
    [param("id").isNumeric(), param("employeeId").isNumeric()],
    typeValidation,
    business.updateEmployee
  );

  // Delete an employee for business
  router.delete(
    "/:id/employee/:employeeId",
    [param("id").isNumeric(), param("employeeId").isNumeric()],
    typeValidation,
    business.deleteOneEmployee
  );

  // Delte all employee for business
  router.delete(
    "/:id/employee",
    [param("id").isNumeric()],
    typeValidation,
    business.deleteAllEmployees
  );

  // Add user to business
  router.post(
    "/:id/user/:userId",
    [param("id").isNumeric(), param("userId").isNumeric()],
    typeValidation,
    business.addCustomer
  );

  // Create a new vacation
  router.post("/:id/vacation", business.createVacation);

  // Retrieve all business vacation
  router.get(
    "/:id/vacation",
    [param("id").isInt()],
    typeValidation,
    business.findAllVacations
  );

  //
  router.get(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    business.findOneVacation
  );

  // Update a vacation
  router.put(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    business.updateVacation
  );

  // Delete a vacation
  router.delete(
    "/:id/vacation/:vacationId",
    [param("id").isInt(), param("vacationId").isInt()],
    typeValidation,
    business.deleteOneVacation
  );

  // Delete all vacations
  router.delete(
    "/:id/vacation",
    [param("id").isInt()],
    typeValidation,
    business.deleteAllVacations
  );

  app.use("/api/business", router);
}

export { init };
