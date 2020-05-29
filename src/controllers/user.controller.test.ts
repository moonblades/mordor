import request from "supertest";
import app from "../app";
import { User } from "../models";

beforeAll(async (done) => {
  // delete all users
  await User.destroy({
    where: {},
    truncate: true,
  });

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
  });

  describe("get all users", () => {
    it("should return all available users", async (done) => {
      const res = await request(app).get("/api/user/");

      expect(res.status).toEqual(200);
      expect(res.body).toEqual([]);
      done();
    });
  });

  describe("get user by id", () => {
    it("retrieves an existing user", async (done) => {
      const user = {
        email: "foo.bar@baz.com",
        displayName: "foo",
        imageUrl: "",
        name: "foo",
        surname: "bar",
        password: "foobared",
        phoneNumber: "1234567890",
        streetAndNumber: "Street 1",
        city: "City",
        postalCode: "0000",
        receiveNotification: true,
        anonymous: false,
      };

      await User.create(user);
      const res = await request(app).get("/api/user/1");

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(user);
      done();
    });
  });
});
