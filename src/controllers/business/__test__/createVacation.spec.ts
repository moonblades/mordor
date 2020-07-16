import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { business, vacation } from "../../../test/testdata";
import { Business } from "../../../models";

async function createVacation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  let res = await request(app)
    .post("/api/business/99/vacation")
    .set({ "firebase-token": token })
    .send(vacation);
  expect(res.status).toEqual(404);

  const newBusiness = await Business.create(business);

  res = await request(app)
    .post(`/api/business/${newBusiness.id}/vacation`)
    .set({ "firebase-token": token })
    .send(vacation);

  expect(res.status).toEqual(201);

  // Missing body
  res = await request(app)
    .post(`/api/business/${newBusiness.id}/vacation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(400);

  done();
}

export default createVacation;
