import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, reservation } from "../../../test/testdata";

async function deleteAllReservations(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  await newBusiness.createReservation(reservation);
  await newBusiness.createReservation(reservation);
  await newBusiness.createReservation(reservation);

  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/reservation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  done();
}

export default deleteAllReservations;
