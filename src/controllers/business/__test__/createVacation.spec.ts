import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { business, vacation } from "../../../test/testdata";
import { Business } from "../../../models";

async function createVacation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .post("/api/business/99/vacation")
    .set({ "firebase-token": token });
  expect(res.status).toEqual(404);

  const newBusiness = await Business.create(business);

  const res2 = await request(app)
    .post(`/api/business/${newBusiness.id}/vacation`)
    .send(vacation)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(201);

  done();
}

export default createVacation;
