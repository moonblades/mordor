import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, product } from "../../../test/testdata";

async function deleteOneProduct(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newProduct = await newBusiness.createProduct(product);

  // Update Product
  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/product/${newProduct.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await newBusiness.countProducts();
  expect(num).toEqual(0);
  done();
}

export default deleteOneProduct;
