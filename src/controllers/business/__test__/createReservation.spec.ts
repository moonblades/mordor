import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, reservation } from "../../../test/testdata";

async function createReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);

  let res = await request(app)
    .post(`/api/business/${newBusiness.id}/reservation`)
    .set({ "firebase-token": token })
    .send(reservation);

  expect(res.status).toEqual(201);

  res = await request(app)
    .post(`/api/business/99/reservation`)
    .set({ "firebase-token": token })
    .send(reservation);

  expect(res.status).toEqual(404);

  res = await request(app)
    .post(`/api/business/${newBusiness.id}/reservation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(400);

  done();
}

export default createReservation;
