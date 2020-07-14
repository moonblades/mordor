import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user } from "../../../test/testdata";

async function findOne(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const res = await request(app)
    .get(`/api/user/${newUser.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toMatchObject(user);

  done();
}

export default findOne;
