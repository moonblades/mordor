import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user } from "../../../test/testdata";

async function updateOne(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);

  const res = await request(app)
    .put(`/api/user/${newUser.id}`)
    .set({ "firebase-token": token })
    .send({ name: "baaz" });

  expect(res.status).toEqual(200);

  const modifiedUser = await User.findByPk(newUser.id);
  expect(modifiedUser.name).toEqual("baaz");

  done();
}

export default updateOne;
