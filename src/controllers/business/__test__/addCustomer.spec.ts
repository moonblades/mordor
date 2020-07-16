import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { business, user } from "../../../test/testdata";

async function addCustomer(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);
  const customer = await User.create(user);

  // Ok
  let res = await request(app)
    .post(`/api/business/${newBusiness.id}/user/${customer.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  // User not found
  res = await request(app)
    .post(`/api/business/99/user/${customer.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  // Customer not found
  res = await request(app)
    .post(`/api/business/${newBusiness.id}/user/99`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  done();
}

export default addCustomer;
