import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business } from "../../../test/testdata";

async function findAll(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  await Business.create(business);

  const res = await request(app)
    .get("/api/business/")
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toHaveLength(1);
  done();
}

export default findAll;
