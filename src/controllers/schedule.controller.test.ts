import request from "supertest";
import app from "../app";

import { truncateAllTables } from "../test/truncateTables";
import firebase from "firebase";
import { Business } from "../models";
import { business, schedule } from "../test/testdata";

beforeEach(async (done) => {
  await truncateAllTables();
  done();
});

describe("Schedule controller", () => {
  it("Should create a schedule", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();
    const newBusiness = await Business.create(business);

    const res = await request(app)
      .post(`/api/business/${newBusiness.id}/schedule`)
      .set({ "firebase-token": token })
      .send(schedule);

    expect(res.status).toEqual(201);
    done();
  });

  it("Should return 404 when creating a schedule for non existing business", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const res = await request(app)
      .post("/api/business/99/schedule")
      .set({ "firebase-token": token });

    expect(res.status).toEqual(404);
    done();
  });

  it("should return business's schedule", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const newBusiness = await Business.create(business);

    const res = await request(app)
      .get(`/api/business/${newBusiness.id}/schedule`)
      .set({ "firebase-token": token });

    expect(res.status).toEqual(200);
    done();
  });

  it("should return 404 when fetching schedule for business", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const res = await request(app)
      .get("/api/business/99/schedule")
      .set({ "firebase-token": token });

    expect(res.status).toEqual(404);
    done();
  });
});
