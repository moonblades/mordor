import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, employee } from "../../../test/testdata";

async function createEmployee(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newBusiness = await Business.create(business);

  let res = await request(app)
    .post(`/api/business/${newBusiness.id}/employee/`)
    .set({ "firebase-token": token })
    .send(employee);

  expect(res.status).toEqual(201);

  const num = await newBusiness.countEmployees();
  expect(num).toEqual(1);

  res = await request(app)
    .post(`/api/business/99/employee/`)
    .set({ "firebase-token": token })
    .send(employee);

  expect(res.status).toEqual(404);

  res = await request(app)
    .post(`/api/business/${newBusiness.id}/employee`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(400);

  done();
}

export default createEmployee;
