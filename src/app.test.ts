import request from "supertest";
import app from "./app";

describe("Get API test", () => {
  it("should test the server api", async (done) => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Welcome to Mordor!" });

    done();
  });
});
