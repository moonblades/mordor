import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, schedule } from "../../../test/testdata";

async function addSchedule(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const res = await request(app)
    .post("/api/business/99/schedule")
    .set({ "firebase-token": token })
    .send(schedule);

  expect(res.status).toEqual(404);

  const newBusiness = await Business.create(business);

  const res2 = await request(app)
    .post(`/api/business/${newBusiness.id}/schedule`)
    .set({ "firebase-token": token })
    .send(schedule);

  expect(res2.status).toEqual(201);

  done();
}

export default addSchedule;
