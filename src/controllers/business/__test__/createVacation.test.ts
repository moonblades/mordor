import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { business, vacation } from "../../../test/testdata";
import { Business } from "../../../models";

async function createVacation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);

  const res = await request(app)
    .post(`/api/business/${newBusiness.id}/vacation`)
    .send(vacation)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  done();
}

export default createVacation;
