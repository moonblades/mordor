import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, vacation } from "../../../test/testdata";

async function updateVacation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);
  const newVacation = await newBusiness.createVacation(vacation);

  const res = await request(app)
    .put(`/api/business/${newBusiness.id}/vacation/${newVacation.id}`)
    .set({ "firebase-token": token })
    .send({
      dateEnd: "2021-10-22T00:00:00.000Z",
    });

  //   const updatedVacation = Vacation.findByPk(newVacation.id);
  expect(res.status).toEqual(200);
  done();
}

export default updateVacation;
