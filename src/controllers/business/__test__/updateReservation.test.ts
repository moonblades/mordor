import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business, Reservation } from "../../../models";
import { business, product, reservation } from "../../../test/testdata";

async function updateReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newReservation = await newBusiness.createReservation(reservation);

  const res = await request(app)
    .put(`/api/business/${newBusiness.id}/reservation/${newReservation.id}`)
    .set({ "firebase-token": token })
    .send({ cancelable: true });

  const updatedReservation = await Reservation.findByPk(newReservation.id);
  expect(res.status).toEqual(200);
  expect(updatedReservation.cancelable).toEqual(true);

  done();
}

export default updateReservation;
