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
    .delete(`/api/business/99/vacation/${newVacation.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  // Update Vacation
  const res2 = await request(app)
    .delete(`/api/business/${newBusiness.id}/vacation/99`)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(404); //TODO: why not 403?

  // Update Vacation
  const res3 = await request(app)
    .delete(`/api/business/${newBusiness.id}/vacation/${newVacation.id}`)
    .set({ "firebase-token": token });

  expect(res3.status).toEqual(200);

  const num = await newBusiness.countVacations();
  expect(num).toEqual(0);
  done();
}

export default deleteOneVacation;
