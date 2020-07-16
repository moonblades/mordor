import { Business } from "../../../models";
import { business, product, reservation } from "../../../test/testdata";
import firebase from "firebase";
import request from "supertest";
import app from "../../../app";

async function addProductToReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);
  const newProduct = await newBusiness.createProduct(product);
  const newReservation = await newBusiness.createReservation(reservation);

  // Ok
  let res = await request(app)
    .post(
      `/api/business/${newBusiness.id}/reservation/${newReservation.id}/product/${newProduct.id}`
    )
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  // Business not found
  res = await request(app)
    .post(
      `/api/business/99/reservation/${newReservation.id}/product/${newProduct.id}`
    )
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  // Reservation not found
  res = await request(app)
    .post(
      `/api/business/${newBusiness.id}/reservation/99/product/${newProduct.id}`
    )
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  // Product not found
  res = await request(app)
    .post(
      `/api/business/${newBusiness.id}/reservation/${newReservation.id}/product/99`
    )
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);
  done();
}

export default addProductToReservation;
