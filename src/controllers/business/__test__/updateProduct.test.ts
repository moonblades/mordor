import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business, Product } from "../../../models";
import { business, product } from "../../../test/testdata";

async function updateProduct(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newProduct = await newBusiness.createProduct(product);

  const res = await request(app)
    .put(`/api/business/${newBusiness.id}/product/${newProduct.id}`)
    .set({ "firebase-token": token })
    .send({ name: "Palantir" });

  expect(res.status).toEqual(200);

  const updatedProduct = await Product.findByPk(newProduct.id);
  expect(updatedProduct.name).toEqual("Palantir");
  done();
}

export default updateProduct;
