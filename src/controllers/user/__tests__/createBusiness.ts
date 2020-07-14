import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user, business } from "../../../test/testdata";

async function createBusiness(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const res = await request(app)
    .post("/api/user/99/business/")
    .set({ "firebase-token": token })
    .send(business);

  expect(res.status).toEqual(404);

  const newUser = await User.create(user);

  const res2 = await request(app)
    .post(`/api/user/${newUser.id}/business/`)
    .set({ "firebase-token": token })
    .send(business);

  expect(res2.status).toEqual(201);

  const num = await newUser.countBusinesses();
  expect(num).toEqual(1);

  done();
}

export default createBusiness;
