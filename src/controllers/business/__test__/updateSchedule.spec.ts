import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business, Schedule } from "../../../models";
import { business, schedule } from "../../../test/testdata";

async function updateSchedule(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newSchedule = await newBusiness.createSchedule(schedule);

  const res = await request(app)
    .put(`/api/business/${newBusiness.id}/schedule/${newSchedule.id}`)
    .set({ "firebase-token": token })
    .send({ dayOfWeek: 2 });

  const updatedSchedule = await Schedule.findByPk(newSchedule.id);
  expect(res.status).toEqual(200);
  expect(updatedSchedule.dayOfWeek).toEqual("mon");
  done();
}

export default updateSchedule;
