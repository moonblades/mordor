import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user, business, reservation } from "../../../test/testdata";

async function createReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  // User not found
  let res = await request(app)
    .post("/api/user/99/reservation/")
    .set({ "firebase-token": token })
    .send(reservation);

  expect(res.status).toEqual(404);

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);
  res = await request(app)
    .post(`/api/user/${newUser.id}/reservation/`)
    .set({ "firebase-token": token })
    .send({ businessId: newBusiness.id, ...reservation });

  expect(res.status).toEqual(201);

  const num = await newUser.countReservations();
  expect(num).toEqual(1);

  res = await request(app)
    .post(`/api/user/${newUser.id}/reservation/`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(400);

  done();
}

export default createReservation;
