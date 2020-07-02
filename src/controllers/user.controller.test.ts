import request from "supertest";
import app from "../app";
import { Business, Reservation, User, Favorite } from "../models";
import { business, reservation, user } from "../test/testdata";
import { truncateAllTables } from "../test/truncateTables";
import firebase from "firebase";

beforeEach(async (done) => {
  await truncateAllTables();

  done();
});

describe("User controller", () => {
  describe("create", () => {
    it("should return 400 if the email is not in the body", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const res = await request(app)
        .post("/api/user/")
        .set({ "firebase-token": token })
        .send({});

      expect(res.status).toEqual(400);
      done();
    });

    it("should create a user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const res = await request(app)
        .post("/api/user/")
        .set({ "firebase-token": token })
        .send(user);

      expect(res.status).toEqual(201);
      expect(res.body).toMatchObject(user);
      done();
    });
  });

  describe("get", () => {
    it("should retrieve three users", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      await User.create(user);
      await User.create(user);
      await User.create(user);

      const res = await request(app)
        .get("/api/user/")
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should return 404 if user does not exist", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const res = await request(app)
        .get("/api/user/99")
        .set({ "firebase-token": token });

      expect(res.status).toEqual(404);
      done();
    });

    it("should return a specific user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const res = await request(app)
        .get(`/api/user/${newUser.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(user);
      done();
    });
  });

  describe("update", () => {
    it("should update the name", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);

      const res = await request(app)
        .put(`/api/user/${newUser.id}`)
        .set({ "firebase-token": token })
        .send({ name: "baaz" });

      expect(res.status).toEqual(200);

      const modifiedUser = await User.findByPk(newUser.id);
      expect(modifiedUser.name).toEqual("baaz");
      done();
    });
  });

  describe("delete", () => {
    it("should delete one user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);

      const res = await request(app)
        .delete(`/api/user/${newUser.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await User.count();
      expect(num).toEqual(0);
      done();
    });

    it("should delete all users", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      await User.create(user);
      await User.create(user);
      await User.create(user);

      const res = await request(app)
        .delete("/api/user/")
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await User.count();
      expect(num).toEqual(0);
      done();
    });
  });

  describe("business", () => {
    it("should return 404 if the user is not existing", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const res = await request(app)
        .post("/api/user/99/business/")
        .set({ "firebase-token": token })
        .send(business);

      expect(res.status).toEqual(404);

      done();
    });

    it("should create one business for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);

      const res = await request(app)
        .post(`/api/user/${newUser.id}/business/`)
        .set({ "firebase-token": token })
        .send(business);

      expect(res.status).toEqual(201);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(1);
      done();
    });

    it("should find three businesses for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);

      const res = await request(app)
        .get(`/api/user/${newUser.id}/business/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should update business name for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app)
        .put(`/api/user/${newUser.id}/business/${newBusiness.id}`)
        .set({ "firebase-token": token })
        .send({ name: "Oceanic Airways" });

      expect(res.status).toEqual(200);

      const modifiedBusiness = await Business.findByPk(newBusiness.id);
      expect(modifiedBusiness.name).toEqual("Oceanic Airways");
      done();
    });

    it("should return 403 when deleting a business of another user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const anotherUser = await User.create(user);
      const newBusiness = await anotherUser.createBusiness(business);

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/business/${newBusiness.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(403);

      const num = await anotherUser.countBusinesses();
      expect(num).toEqual(1);

      done();
    });

    it("should delete a business of the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/business/${newBusiness.id}`)
        .set({ "firebase-token": token });
      expect(res.status).toEqual(200);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(0);

      done();
    });

    it("should delete all businesses of the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);
      await newUser.createBusiness(business);

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/business`)
        .set({ "firebase-token": token });
      expect(res.status).toEqual(200);

      const num = await newUser.countBusinesses();
      expect(num).toEqual(0);

      done();
    });
  });

  describe("reservation", () => {
    it("should return 404 if the user is not existing", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const res = await request(app)
        .post("/api/user/99/reservation/")
        .set({ "firebase-token": token })
        .send(business);

      expect(res.status).toEqual(404);

      done();
    });

    it("should create one reservation for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      const res = await request(app)
        .post(`/api/user/${newUser.id}/reservation/`)
        .set({ "firebase-token": token })
        .send({ businessId: newBusiness.id, ...reservation });

      expect(res.status).toEqual(201);

      const num = await newUser.countReservations();
      expect(num).toEqual(1);
      done();
    });

    it("should find three reservations for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

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

      const res = await request(app)
        .get(`/api/user/${newUser.id}/reservation/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(3);
      done();
    });

    it("should update reservation date for the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      const newReservation = await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app)
        .put(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
        .set({ "firebase-token": token })
        .send({ date: "2020-05-30" });

      expect(res.status).toEqual(200);

      const modifiedReservation = await Reservation.findByPk(newReservation.id);
      expect(modifiedReservation.date.toISOString()).toBe(
        "2020-05-30T00:00:00.000Z"
      );
      done();
    });

    it("should return 403 when deleting a reservation of another user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const anotherUser = await User.create(user);
      const newBusiness = await anotherUser.createBusiness(business);
      const newReservation = await anotherUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(403);

      const num = await anotherUser.countReservations();
      expect(num).toEqual(1);

      done();
    });

    it("should delete a reservation of the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);
      const newReservation = await newUser.createReservation({
        businessId: newBusiness.id,
        ...reservation,
      });

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
        .set({ "firebase-token": token });
      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(0);

      done();
    });

    it("should delete all reservations of the user", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

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

      const res = await request(app)
        .delete(`/api/user/${newUser.id}/reservation`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await newUser.countReservations();
      expect(num).toEqual(0);

      done();
    });
  });

  describe("Favorites", () => {
    it("Create a favorite", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const newUser = await User.create(user);
      const newBusiness = await newUser.createBusiness(business);

      const res = await request(app)
        .post(`/api/user/${newUser.id}/favorite/${newBusiness.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(201);
      const favorite = await Favorite.findAll({
        where: {
          userId: newUser.id,
          businessId: newBusiness.id,
        },
      });

      expect(favorite).toHaveLength(1);

      done();
    });
  });

  it("Find all user's favorites", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const newUser = await User.create(user);
    const newBusinesses = [
      await newUser.createBusiness(business),
      await newUser.createBusiness(business),
      await newUser.createBusiness(business),
    ];

    await Favorite.create({
      userId: newUser.id,
      businessId: newBusinesses[0].id,
    });
    await Favorite.create({
      userId: newUser.id,
      businessId: newBusinesses[1].id,
    });
    await Favorite.create({
      userId: newUser.id,
      businessId: newBusinesses[2].id,
    });

    const res = await request(app)
      .get(`/api/user/${newUser.id}/favorite`)
      .set({ "firebase-token": token });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(3);

    done();
  });
});
