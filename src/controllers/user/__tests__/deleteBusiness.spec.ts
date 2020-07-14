import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { business, user } from "../../../test/testdata";

async function deleteBusiness(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const anotherUser = await User.create(user);
  const newBusiness = await anotherUser.createBusiness(business);

  const res = await request(app)
    .delete(`/api/user/${newUser.id}/business/${newBusiness.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(403);

  const num = await anotherUser.countBusinesses();
  expect(num).toEqual(1);

  const res2 = await request(app)
    .delete(`/api/user/${anotherUser.id}/business/${newBusiness.id}`)
    .set({ "firebase-token": token });
  expect(res2.status).toEqual(200);

  const num2 = await anotherUser.countBusinesses();
  expect(num2).toEqual(0);

  done();
}

export default deleteBusiness;
