import request from "supertest";
import firebase from "firebase";
import app from "./app";
import "./firebaseApp";

describe("Get API test", () => {
  it("should test the server api", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await request(app).get("/").set({ "firebase-token": token });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Welcome to Mordor!" });

    done();
  });
});
