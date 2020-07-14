import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user } from "../../../test/testdata";

async function deleteOne(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);

  const res = await request(app)
    .delete(`/api/user/${newUser.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await User.count();
  expect(num).toEqual(0);

  done();
}

export default deleteOne;
