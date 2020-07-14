import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { Business, Employee } from "../../../models";
import { business, employee } from "../../../test/testdata";

async function updateEmployee(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();
  const newBusiness = await Business.create(business);
  const newEmployee = await newBusiness.createEmployee(employee);

  const res = await request(app)
    .put(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
    .set({ "firebase-token": token })
    .send({ name: "Bob" });

  expect(res.status).toEqual(200);

  const modifiedEmployee = await Employee.findByPk(newEmployee.id);
  expect(modifiedEmployee.name).toEqual("Bob");
  done();
}

export default updateEmployee;
