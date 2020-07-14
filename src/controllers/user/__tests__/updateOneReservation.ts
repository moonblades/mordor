import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User, Reservation } from "../../../models";
import { user, business, reservation } from "../../../test/testdata";

async function updateOneReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);
  const newReservation = await newUser.createReservation({
    businessId: newBusiness.id,
    ...reservation,
  });

  const res = await request(app)
    .put(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
    .set({ "firebase-token": token })
    .send({ date: "2020-05-30" });

  expect(res.status).toEqual(200);

  const modifiedReservation = await Reservation.findByPk(newReservation.id);
  expect(modifiedReservation.date.toISOString()).toBe(
    "2020-05-30T00:00:00.000Z"
  );

  done();
}

export default updateOneReservation;
