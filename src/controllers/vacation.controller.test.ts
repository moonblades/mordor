import request from "supertest";
import app from "../app";

import { truncateAllTables } from "../test/truncateTables";
import firebase from "firebase";
import { Business } from "../models";
import { business, vacation } from "../test/testdata";

beforeEach(async (done) => {
  await truncateAllTables();
  done();
});

describe("Vacation controller", () => {
  it("Should create a vacation", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();
    const newBusiness = await Business.create(business);

    const res = await request(app)
      .post(`/api/business/${newBusiness.id}/vacation`)
      .set({ "firebase-token": token })
      .send(vacation);

    expect(res.status).toEqual(201);
    done();
  });

  it("Should return 404 when creating a vacation for non existing business", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const res = await request(app)
      .post("/api/business/99/vacation")
      .set({ "firebase-token": token });

    expect(res.status).toEqual(404);
    done();
  });
});
