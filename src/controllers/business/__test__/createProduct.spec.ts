import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, product } from "../../../test/testdata";

async function createProduct(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);

  let res = await request(app)
    .post(`/api/business/${newBusiness.id}/product`)
    .set({ "firebase-token": token })
    .send(product);

  expect(res.status).toEqual(201);

  const num = await newBusiness.countProducts();
  expect(num).toEqual(1);

  // Business not found
  res = await request(app)
    .post(`/api/business/99/product`)
    .set({ "firebase-token": token })
    .send(product);

  expect(res.status).toEqual(404);

  // Missing body
  res = await request(app)
    .post(`/api/business/${newBusiness.id}/product`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(400);

  done();
}

export default createProduct;
