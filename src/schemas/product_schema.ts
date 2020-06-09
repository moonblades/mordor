import { checkSchema } from "express-validator";

function productSchema() {
  return checkSchema({
    //   "name": "test",
    //   "description": "test_description",
    //   "price": 6.0,
    //   "duration": 30,
    //   "weight": 0,
    //   "sale": false,
    //   "salePercentage": 20,
    //   "available": true,
    //   "whenAvailable": "2020-05-23"
    name: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    description: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    price: {
      in: ["body"],
      isFloat: true,
      exists: true,
    },
    duration: {
      in: ["body"],
      isInt: true,
    },
    preparation: {
      in: ["body"],
      isInt: true,
    },
    postProcessing: {
      in: ["body"],
      isInt: true,
    },
    weight: {
      in: ["body"],
      isInt: true,
      optional: true,
    },
    sale: {
      in: ["body"],
      isBoolean: true,
      exists: true,
    },
    salePercentage: {
      in: ["body"],
      isInt: { options: { min: 0, max: 100 } },
      optional: true,
    },
    available: {
      in: ["body"],
      isBoolean: true,
      exists: true,
    },
    whenAvailable: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      optional: true,
    },
    cancelationTime: {
      in: ["body"],
      isInt: true,
    },
  });
}

export { productSchema };
