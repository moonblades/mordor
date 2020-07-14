import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { business, reservation, user } from "../../../test/testdata";

async function deleteAllReservations(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);
  await newUser.createReservation({
    businessId: newBusiness.id,
    ...reservation,
  });
  await newUser.createReservation({
    businessId: newBusiness.id,
    ...reservation,
  });
  await newUser.createReservation({
    businessId: newBusiness.id,
    ...reservation,
  });

  const res = await request(app)
    .delete(`/api/user/${newUser.id}/reservation`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);

  const num = await newUser.countReservations();
  expect(num).toEqual(0);

  done();
}

export default deleteAllReservations;
