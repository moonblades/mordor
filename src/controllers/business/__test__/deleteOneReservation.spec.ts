import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, reservation } from "../../../test/testdata";

async function deleteOneReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newReservation = await newBusiness.createReservation(reservation);

  const res = await request(app)
    .delete(`/api/business/99/reservation/${newReservation.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  const res2 = await request(app)
    .delete(`/api/business/${newBusiness.id}/reservation/99`)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(403);

  // Update Reservation
  const res3 = await request(app)
    .delete(`/api/business/${newBusiness.id}/reservation/${newReservation.id}`)
    .set({ "firebase-token": token });

  expect(res3.status).toEqual(200);

  const num = await newBusiness.countReservations();
  expect(num).toEqual(0);
  done();
}

export default deleteOneReservation;
