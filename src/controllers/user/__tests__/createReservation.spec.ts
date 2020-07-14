import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user, business, reservation } from "../../../test/testdata";

async function createReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .post("/api/user/99/reservation/")
    .set({ "firebase-token": token })
    .send(business);

  expect(res.status).toEqual(404);

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);
  const res2 = await request(app)
    .post(`/api/user/${newUser.id}/reservation/`)
    .set({ "firebase-token": token })
    .send({ businessId: newBusiness.id, ...reservation });

  expect(res2.status).toEqual(201);

  const num = await newUser.countReservations();
  expect(num).toEqual(1);

  done();
}

export default createReservation;
