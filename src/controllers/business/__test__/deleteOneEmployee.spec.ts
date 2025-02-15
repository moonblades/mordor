import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business } from "../../../models";
import { business, employee } from "../../../test/testdata";

async function deleteOneEmployee(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newEmployee = await newBusiness.createEmployee(employee);

  const res = await request(app)
    .delete(`/api/business/${newBusiness.id}/employee/99`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(403);

  // Update employee
  const res2 = await request(app)
    .delete(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
    .set({ "firebase-token": token });

  expect(res2.status).toEqual(200);

  const num = await newBusiness.countEmployees();
  expect(num).toEqual(0);
  done();
}

export default deleteOneEmployee;
