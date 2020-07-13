import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, vacation } from "../../../test/testdata";

async function deleteOneVacation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newVacation = await newBusiness.createVacation(vacation);

  // Update Vacation
  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/vacation/${newVacation.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await newBusiness.countVacations();
  expect(num).toEqual(0);
  done();
}

export default deleteOneVacation;
