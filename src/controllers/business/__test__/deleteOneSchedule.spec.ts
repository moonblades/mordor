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
    .delete(`/api/business/99/schedule/${newSchedule.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  const res2 = await request(app)
    .delete(`/api/business/${newBusiness.id}/schedule/99`)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(404); // TODO: why not 403?

  const res3 = await request(app)
    .delete(`/api/business/${newBusiness.id}/schedule/${newSchedule.id}`)
    .set({ "firebase-token": token });

  expect(res3.status).toEqual(200);

  const num = await newBusiness.countSchedules();
  expect(num).toEqual(0);

  done();
}

export default deleteOneSchedule;
