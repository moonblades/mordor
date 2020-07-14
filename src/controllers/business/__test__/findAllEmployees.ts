import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, employee } from "../../../test/testdata";

async function findAllEmployees(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  await newBusiness.createEmployee(employee);
  await newBusiness.createEmployee(employee);
  await newBusiness.createEmployee(employee);

  // Update employee
  const res = await request(app)
    .get(`/api/business/${newBusiness.id}/employee/`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toHaveLength(3);
  done();
}

export default findAllEmployees;
