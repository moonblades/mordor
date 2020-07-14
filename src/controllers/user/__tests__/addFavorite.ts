import firebase from "firebase";
import request from "supertest";
import app from "../../../app";
import { User, Favorite } from "../../../models";
import { user, business } from "../../../test/testdata";

async function addFavorite(done: jest.DoneCallback) {
  const token = await firebase.auth().currentUser.getIdToken();

  const newUser = await User.create(user);
  const newBusiness = await newUser.createBusiness(business);

  const res = await request(app)
    .post(`/api/user/${newUser.id}/favorite/${newBusiness.id}`)
    .set({ "firebase-token": token });

  expect(res.status).toEqual(201);
  const favorite = await Favorite.findAll({
    where: {
      userId: newUser.id,
      businessId: newBusiness.id,
    },
  });

  expect(favorite).toHaveLength(1);

  done();
}

export default addFavorite;
