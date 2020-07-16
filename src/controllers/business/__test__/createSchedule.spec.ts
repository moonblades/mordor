import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { business, schedule } from "../../../test/testdata";
import { Business } from "../../../models";

async function createSchedule(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);

  let res = await request(app)
    .post(`/api/business/${newBusiness.id}/schedule`)
    .send(schedule)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);

  res = await request(app)
    .post(`/api/business/99/schedule`)
    .send(schedule)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(404);

  done();
}

export default createSchedule;
