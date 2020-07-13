import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, product } from "../../../test/testdata";

async function deleteAllProducts(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  await newBusiness.createProduct(product);
  await newBusiness.createProduct(product);
  await newBusiness.createProduct(product);

  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/product/`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  const num = await newBusiness.countProducts();
  expect(num).toEqual(0);
  done();
}

export default deleteAllProducts;
