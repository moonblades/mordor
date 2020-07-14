import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, product, vacation } from "../../../test/testdata";

async function findAllVacations(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  await newBusiness.createVacation(vacation);

  const res = await request(app)
    .get(`/api/business/${newBusiness.id}/vacation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toHaveLength(1);

  done();
}

export default findAllVacations;
