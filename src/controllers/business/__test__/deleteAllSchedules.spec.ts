import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, schedule } from "../../../test/testdata";

async function deleteAllSchedules(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .delete(`/api/business/99/schedule`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  const newBusiness = await Business.create(business);
  await newBusiness.createSchedule(schedule);
  await newBusiness.createSchedule(schedule);
  await newBusiness.createSchedule(schedule);

  const res2 = await request(app)
    .delete(`/api/business/${newBusiness.id}/schedule`)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(200);

  done();
}

export default deleteAllSchedules;
