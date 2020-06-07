import request from "supertest";
import app from "../app";
import { Business, Reservation, User } from "../models";
import { business, reservation, user } from "../test/testdata";
import { truncateAllTables } from "../test/truncateTables";

beforeEach(async (done) => {
  await truncateAllTables();

  done();
});

describe("User controller", () => {
  describe("create", () => {
    it("should return 400 if the email is not in the body", async (done) => {
      const body = {};
      const res = await request(app).post("/api/user/").send(body);

      expect(res.status).toEqual(400);
      done();
    });

    it("should create a user", async (done) => {
      const res = await request(app).post("/api/user/").send(user);

      expect(res.status).toEqual(201);
      expect(res.body).toMatchObject(user);
      done();
    });
  });

  describe("get", () => {
    it("should retrieve three users", async (done) => {
      await User.create(user);
      await User.create(user);
      await User.create(user);

      const res = await request(app).get("/api/user/");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should return 404 if user does not exist", async (done) => {
      const res = await request(app).get("/api/user/99");

      expect(res.status).toEqual(404);
      done();
    });

    it("should return a specific user", async (done) => {
      const newUser = await User.create(user);
      const res = await request(app).get(`/api/user/${newUser.id}`);

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(user);
      done();
    });
  });

  describe("update", () => {
    it("should update the name", async (done) => {
      const newUser = await User.create(user);

      const res = await request(app).put(`/api/user/${newUser.id}`).send({
        name: "baaz",
      });

      expect(res.status).toEqual(200);

      const modifiedUser = await User.findByPk(newUser.id);
      expect(modifiedUser.name).toEqual("baaz");
      done();
    });
  });

  describe("delete", () => {
    it("should delete one user", async (done) => {
      const newUser = await User.create(user);

      const res = await request(app).delete(`/api/user/${newUser.id}`);

      expect(res.status).toEqual(200);

      const num = await User.count();
      expect(num).toEqual(0);
      done();
    });

    it("should delete all users", async (done) => {
      await User.create(user);
      await User.create(user);
      await User.create(user);

      const res = await request(app).delete("/api/user/");

      expect(res.status).toEqual(200);

      const num = await User.count();
      expect(num).toEqual(0);
      done();
    });
  });

  describe("business", () => {
    it("should return 404 if the user is not existing", async (done) => {
      const res = await request(app)
        .post("/api/user/99/business/")
        .send(business);

      expect(res.status).toEqual(404);

      done();
    });

    it("should create one business for the user", async (done) => {
      const newUser = await User.create(user);

      const res = await request(app)
        .post(`/api/user/${newUser.id}/business/`)
        .send(business);

      expect(res.status).toEqual(201);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(1);
      done();
    });

    it("should find three businesses for the user", async (done) => {
      const newUser = await User.create(user);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);

      const res = await request(app).get(`/api/user/${newUser.id}/business/`);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should update business name for the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app)
        .put(`/api/user/${newUser.id}/business/${newBusiness.id}`)
        .send({ name: "Oceanic Airways" });

      expect(res.status).toEqual(200);

      const modifiedBusiness = await Business.findByPk(newBusiness.id);
      expect(modifiedBusiness.name).toEqual("Oceanic Airways");
      done();
    });

    it("should return 404 when deleting a business of another user", async (done) => {
      const newUser = await User.create(user);
      const anotherUser = await User.create(user);
      const newBusiness = await anotherUser.createBusiness(business);

      const res = await request(app).delete(
        `/api/user/${newUser.id}/business/${newBusiness.id}`
      );
      expect(res.status).toEqual(400);

      const num = await anotherUser.countBusinesses();
      expect(num).toEqual(1);

      done();
    });

    it("should delete a business of the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app).delete(
        `/api/user/${newUser.id}/business/${newBusiness.id}`
      );
      expect(res.status).toEqual(200);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(0);

      done();
    });

    it("should delete all businesses of the user", async (done) => {
      const newUser = await User.create(user);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);

      const res = await request(app).delete(`/api/user/${newUser.id}/business`);
      expect(res.status).toEqual(200);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(0);

      done();
    });
  });

  describe("reservation", () => {
    it("should return 404 if the user is not existing", async (done) => {
      const res = await request(app)
        .post("/api/user/99/reservation/")
        .send(business);

      expect(res.status).toEqual(404);

      done();
    });

    it("should create one reservation for the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app)
        .post(`/api/user/${newUser.id}/reservation/`)
        .send({ businessId: newBusiness.id, ...reservation });

      expect(res.status).toEqual(201);

      const num = await newUser.countReservations();
      expect(num).toEqual(1);
      done();
    });

    it("should find three reservations for the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });
      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });
      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app).get(
        `/api/user/${newUser.id}/reservation/`
      );

      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(3);
      done();
    });

    it("should update reservation date for the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      const newReservation = await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app)
        .put(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
        .send({ date: "2020-05-30" });

      expect(res.status).toEqual(200);

      const modifiedReservation = await Reservation.findByPk(newReservation.id);
      expect(modifiedReservation.date.toISOString()).toBe(
        "2020-05-30T00:00:00.000Z"
      );
      done();
    });

    it("should return 404 when deleting a reservation of another user", async (done) => {
      const newUser = await User.create(user);
      const anotherUser = await User.create(user);
      const newBusiness = await anotherUser.createBusiness(business);
      const newReservation = await anotherUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app).delete(
        `/api/user/${newUser.id}/reservation/${newReservation.id}`
      );
      expect(res.status).toEqual(404);

      const num = await anotherUser.countReservations();
      expect(num).toEqual(1);

      done();
    });

    it("should delete a reservation of the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      const newReservation = await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app).delete(
        `/api/user/${newUser.id}/reservation/${newReservation.id}`
      );
      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(0);

      done();
    });

    it("should delete all reservations of the user", async (done) => {
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });
      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });
      await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app).delete(
        `/api/user/${newUser.id}/reservation`
      );
      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(0);

      done();
    });
  });
});
