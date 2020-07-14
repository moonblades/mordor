import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, schedule } from "../../../test/testdata";

async function deleteOneSchedule(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newSchedule = await newBusiness.createSchedule(schedule);

  expect(await newBusiness.countSchedules()).toEqual(1);

  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/schedule/${newSchedule.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await newBusiness.countSchedules();
  expect(num).toEqual(0);

  done();
}

export default deleteOneSchedule;
