import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, reservation } from "../../../test/testdata";

async function deleteOneReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newReservation = await newBusiness.createReservation(reservation);

  // Update Reservation
  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/reservation/${newReservation.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await newBusiness.countReservations();
  expect(num).toEqual(0);
  done();
}

export default deleteOneReservation;
