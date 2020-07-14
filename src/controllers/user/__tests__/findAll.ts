import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user } from "../../../test/testdata";

async function findAll(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .get("/api/user/99")
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  await User.create(user);
  await User.create(user);
  await User.create(user);

  const res2 = await request(app)
    .get("/api/user/")
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(200);
  expect(res2.body).toHaveLength(3);

  done();
}

export default findAll;
