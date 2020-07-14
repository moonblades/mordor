import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, vacation } from "../../../test/testdata";

async function deleteAllVacations(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);
  await newBusiness.createVacation(vacation);
  await newBusiness.createVacation(vacation);
  await newBusiness.createVacation(vacation);

  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/vacation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  done();
}

export default deleteAllVacations;
