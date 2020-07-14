import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, product } from "../../../test/testdata";

async function findAllProducts(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  await newBusiness.createProduct(product);
  await newBusiness.createProduct(product);
  await newBusiness.createProduct(product);

  const res = await request(app)
    .get(`/api/business/${newBusiness.id}/product/`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toHaveLength(3);

  done();
}

export default findAllProducts;
