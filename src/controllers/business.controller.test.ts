import request from "supertest";
import app from "../app";
import { Business, Employee, Product } from "../models";
import { business, employee, product, reservation } from "../test/testdata";
import { truncateAllTables } from "../test/truncateTables";
import firebase from "firebase";

beforeEach(async (done) => {
  await truncateAllTables();

  done();
});

describe("Business controller", () => {
  it("should add a product to a reservation", async (done) => {
    const token = await firebase.auth().currentUser.getIdToken();

    const newBusiness = await Business.create(business);
    const newProduct = await newBusiness.createProduct(product);
    const newReservation = await newBusiness.createReservation(reservation);

    const res = await request(app)
      .post(
        `/api/business/${newBusiness.id}/reservation/${newReservation.id}/product/${newProduct.id}`
      )
      .set({ "firebase-token": token });

    expect(res.status).toEqual(201);

    done();
  });
  describe("get", () => {
    it("should retrieve a business", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      await Business.create(business);

      const res = await request(app)
        .get("/api/business/")
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(1);
      done();
    });
  });

  describe("product", () => {
    it("should create a product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);

      const res = await request(app)
        .post(`/api/business/${newBusiness.id}/product`)
        .set({ "firebase-token": token })
        .send(product);

      expect(res.status).toEqual(201);

      const num = await newBusiness.countProducts();
      expect(num).toEqual(1);
      done();
    });

    it("should return 400 after creating a product with empty body", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const newBusiness = await Business.create(business);
      const res = await request(app)
        .post(`/api/business/${newBusiness.id}/product`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(400);

      done();
    });

    it("should return 404 after creating a product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      // const newBusiness = await Business.create(business);
      const res = await request(app)
        .post(`/api/business/99/product`)
        .set({ "firebase-token": token })
        .send(product);

      expect(res.status).toEqual(404);

      done();
    });

    it("should update a product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newProduct = await newBusiness.createProduct(product);

      const res = await request(app)
        .put(`/api/business/${newBusiness.id}/product/${newProduct.id}`)
        .set({ "firebase-token": token })
        .send({ name: "Palantir" });

      expect(res.status).toEqual(200);

      const updatedProduct = await Product.findByPk(newProduct.id);
      expect(updatedProduct.name).toEqual("Palantir");
      done();
    });

    it("should return 403 when updating a product of another business", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newProduct = await newBusiness.createProduct(product);
      const anotherBusiness = await Business.create(business);

      const res = await request(app)
        .put(`/api/business/${anotherBusiness.id}/product/${newProduct.id}`)
        .set({ "firebase-token": token })
        .send({ name: "Palantir" });

      expect(res.status).toEqual(403);

      done();
    });

    it("should retrieve all products", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      await newBusiness.createProduct(product);
      await newBusiness.createProduct(product);
      await newBusiness.createProduct(product);

      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/product/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      const num = await newBusiness.countProducts();
      expect(num).toEqual(3);

      done();
    });

    it("should retrieve a product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newProduct = await newBusiness.createProduct(product);

      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/product/${newProduct.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(product);
      done();
    });

    it("should delete a product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newProduct = await newBusiness.createProduct(product);

      const res = await request(app)
        .delete(`/api/business/${newBusiness.id}/product/${newProduct.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      const num = await newBusiness.countProducts();
      expect(num).toEqual(0);
      done();
    });

    it("should delete all product", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      await newBusiness.createProduct(product);
      await newBusiness.createProduct(product);
      await newBusiness.createProduct(product);

      const res = await request(app)
        .delete(`/api/business/${newBusiness.id}/product/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      const num = await newBusiness.countProducts();
      expect(num).toEqual(0);

      done();
    });
  });

  describe("employee", () => {
    it("should create an employee", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);

      const res = await request(app)
        .post(`/api/business/${newBusiness.id}/employee/`)
        .set({ "firebase-token": token })
        .send(employee);

      expect(res.status).toEqual(201);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(1);
      done();
    });

    it("should update an employee", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .put(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
        .set({ "firebase-token": token })
        .send({ name: "Bob" });

      expect(res.status).toEqual(200);

      const modifiedEmployee = await Employee.findByPk(newEmployee.id);
      expect(modifiedEmployee.name).toEqual("Bob");
      done();
    });

    it("should return 403 when updating a employee of another business", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);
      const anotherBusiness = await Business.create(business);

      // Update employee
      const res = await request(app)
        .put(`/api/business/${anotherBusiness.id}/employee/${newEmployee.id}`)
        .set({ "firebase-token": token })
        .send({ name: "Bob" });

      expect(res.status).toEqual(403);

      done();
    });

    it("should retrieve all employees", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/employee/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(3);
      done();
    });

    it("should retrieve an employee", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(employee);
      done();
    });

    it("should delete an employee", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .delete(`/api/business/${newBusiness.id}/employee/${newEmployee.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(0);
      done();
    });

    it("should return 403 when deleting an employee", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      const newEmployee = await newBusiness.createEmployee(employee);
      const anotherBusiness = await Business.create(business);

      // Update employee
      const res = await request(app)
        .delete(
          `/api/business/${anotherBusiness.id}/employee/${newEmployee.id}`
        )
        .set({ "firebase-token": token });

      expect(res.status).toEqual(403);

      done();
    });
    it("should delete all employees", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();

      const newBusiness = await Business.create(business);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);
      await newBusiness.createEmployee(employee);

      // Update employee
      const res = await request(app)
        .delete(`/api/business/${newBusiness.id}/employee/`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);

      const num = await newBusiness.countEmployees();
      expect(num).toEqual(0);
      done();
    });
  });

  describe("reservation", () => {
    it("should create a reservation", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const newBusiness = await Business.create(business);

      const res = await request(app)
        .post(`/api/business/${newBusiness.id}/reservation`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(201);

      done();
    });

    it("should retrieve three reservations", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const newBusiness = await Business.create(business);
      await newBusiness.createReservation(reservation);
      await newBusiness.createReservation(reservation);
      await newBusiness.createReservation(reservation);

      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/reservation`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(3);
      done();
    });

    it("should return a specific reservation", async (done) => {
      const token = await firebase.auth().currentUser.getIdToken();
      const newBusiness = await Business.create(business);
      const newReservation = await newBusiness.createReservation(reservation);

      const res = await request(app)
        .get(`/api/business/${newBusiness.id}/reservation/${newReservation.id}`)
        .set({ "firebase-token": token });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(reservation);
      done();
    });
  });
});
