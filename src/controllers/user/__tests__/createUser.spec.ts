import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { user } from "../../../test/testdata";

async function createUser(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .post("/api/user/")
    .set({ "firebase-token": token })
    .send({});

  expect(res.status).toEqual(400);

  const res2 = await request(app)
    .post("/api/user/")
    .set({ "firebase-token": token })
    .send(user);

  expect(res2.status).toEqual(201);
  expect(res2.body).toMatchObject(user);
  done();
}

export default createUser;
