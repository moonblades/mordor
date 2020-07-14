import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user, business } from "../../../test/testdata";

async function deleteAllBusinesses(done: jest.DoneCallback) {
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
}

export default deleteAllBusinesses;
