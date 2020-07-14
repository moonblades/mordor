import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User, Favorite } from "../../../models";
import { user, business } from "../../../test/testdata";

async function findAllFavorites(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusinesses = [
    await newUser.createBusiness(business),
    await newUser.createBusiness(business),
    await newUser.createBusiness(business),
  ];

  await Favorite.create({
    userId: newUser.id,
    businessId: newBusinesses[0].id,
  });
  await Favorite.create({
    userId: newUser.id,
    businessId: newBusinesses[1].id,
  });
  await Favorite.create({
    userId: newUser.id,
    businessId: newBusinesses[2].id,
  });

  const res = await request(app)
    .get(`/api/user/${newUser.id}/favorite`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(200);
  expect(res.body).toHaveLength(3);

  done();
}

export default findAllFavorites;
