import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User, Business } from "../../../models";
import { business, user } from "../../../test/testdata";

async function addCustomer(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  // const newUser = await User.create(user);
  const newBusiness = await Business.create(business);
  const customer = await User.create(user);

  const res = await request(app)
    .post(`/api/business/${newBusiness.id}/user/${customer.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  done();
}

export default addCustomer;
