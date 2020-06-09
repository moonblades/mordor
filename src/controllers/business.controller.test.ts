import request from "supertest";
import app from "../app";
import { Business, Employee } from "../models";
import { business, employee } from "../test/testdata";
import { truncateAllTables } from "../test/truncateTables";

beforeEach(async (done) => {
  await truncateAllTables();

  done();
});

describe("Business controller", () => {
  describe("get", () => {
    it("should retrieve a business", async (done) => {
      await Business.create(business);

      const res = await request(app).get("/api/business/");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(1);
      done();
    });
  });

  describe("employee", () => {
    it("should create an employee", async (done) => {
      const newBusiness = await Business.create(business);

      const res = await request(app)
        .post(`/api/business/${newBusiness.id}/employee/`)
        .send(employee);

      expect(res.status).toEqual(201);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(1);
      done();
    });

    it("should update an employee", async (done) => {
      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .put(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
        .send({ name: "Bob" });

      expect(res.status).toEqual(200);

      const modifiedEmployee = await Employee.findByPk(newEmployee.id);
      expect(modifiedEmployee.name).toEqual("Bob");
      done();
    });

    it("should retrieve all employees", async (done) => {
      const newBusiness = await Business.create(business);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app).get(
        `/api/business/${newBusiness.id}/employee/`
      );

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(3);
      done();
    });

    it("should retrieve an employee", async (done) => {
      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app).get(
        `/api/business/${newBusiness.id}/employee/${newEmployee.id}`
      );

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(employee);
      done();
    });

    it("should delete an employee", async (done) => {
      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app).delete(
        `/api/business/${newBusiness.id}/employee/${newEmployee.id}`
      );

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(0);
      done();
    });

    it("should delete all employees", async (done) => {
      const newBusiness = await Business.create(business);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app).delete(
        `/api/business/${newBusiness.id}/employee/`
      );

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(0);
      done();
    });
  });
});
