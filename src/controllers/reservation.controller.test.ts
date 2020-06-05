import request from "supertest";
import app from "../app";
import logger from "../logger";
import { Business, Product, Reservation, User } from "../models";
import { product, reservation } from "../test/testdata";

beforeEach(async (done) => {
  await Reservation.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Reservation table`);

  await Product.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Product table`);

  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up User table`);

  await Business.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Business table`);

  done();
});

describe("Reservation controller", () => {
  describe("get", () => {
    it("should retrieve three reservations", async (done) => {
      await Reservation.create(reservation);
      await Reservation.create(reservation);
      await Reservation.create(reservation);

      const res = await request(app).get("/api/reservation/");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should return a specific reservation", async (done) => {
      const newReservation = await Reservation.create(reservation);

      const res = await request(app).get(
        `/api/reservation/${newReservation.id}`
      );

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(reservation);
      done();
    });
  });

  describe("product", () => {
    it("should return 404 when adding a product if the reservation does not exist", async (done) => {
      const newProduct = await Product.create(product);

      const res = await request(app).post(
        `/api/reservation/99/product/${newProduct.id}`
      );

      expect(res.status).toEqual(404);
      done();
    });

    it("should return 404 when adding a product if the product does not exist", async (done) => {
      const newReservation = await Reservation.create(reservation);

      const res = await request(app).post(
        `/api/reservation/${newReservation.id}/product/99`
      );

      expect(res.status).toEqual(404);
      done();
    });

    it("should add a product to a reservation", async (done) => {
      const newReservation = await Reservation.create(reservation);
      const newProduct = await Product.create(product);

      const res = await request(app).post(
        `/api/reservation/${newReservation.id}/product/${newProduct.id}`
      );

      expect(res.status).toEqual(201);

      // TODO: check why newReservation.countProducts() is returni 0 elements
      const products = await newReservation.getProducts();
      expect(products.length).toEqual(1);
      done();
    });
  });
});
