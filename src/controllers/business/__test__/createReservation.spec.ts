import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, reservation } from "../../../test/testdata";

async function createReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);

  const res = await request(app)
    .post(`/api/business/${newBusiness.id}/reservation`)
    .send(reservation)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  done();
}

export default createReservation;
