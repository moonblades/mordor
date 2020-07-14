import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../models";
import { user, business, reservation } from "../../../test/testdata";

async function deleteOneReservation(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const anotherUser = await User.create(user);
  const newBusiness = await anotherUser.createBusiness(business);
  const newReservation = await anotherUser.createReservation({
    businessId: newBusiness.id,
    ...reservation,
  });

  const res = await request(app)
    .delete(`/api/user/${newUser.id}/reservation/${newReservation.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(403);

  const num = await anotherUser.countReservations();
  expect(num).toEqual(1);

  const newUser2 = await User.create(user);
  const newBusiness2 = await newUser2.createBusiness(business);
  const newReservation2 = await newUser2.createReservation({
    businessId: newBusiness2.id,
    ...reservation,
  });

  const res2 = await request(app)
    .delete(`/api/user/${newUser2.id}/reservation/${newReservation2.id}`)
    .set({ "firebase-token": token });
  expect(res2.status).toEqual(200);

  const num2 = await newUser2.countReservations();
  expect(num2).toEqual(0);

  done();
}

export default deleteOneReservation;
