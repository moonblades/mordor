import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User, Business } from "../../../models";
import { user, business } from "../../../test/testdata";

async function updateOneBusiness(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);

  const res = await request(app)
    .put(`/api/user/${newUser.id}/business/${newBusiness.id}`)
    .set({ "firebase-token": token })
    .send({ name: "Oceanic Airways" });

  expect(res.status).toEqual(200);

  const modifiedBusiness = await Business.findByPk(newBusiness.id);
  expect(modifiedBusiness.name).toEqual("Oceanic Airways");

  done();
}

export default updateOneBusiness;
