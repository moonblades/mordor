import { checkSchema } from "express-validator";

function productSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    name: {
      in: ["body"],
      isString: true,
    },
    description: {
      in: ["body"],
      isString: true,
    },
    price: {
      in: ["body"],
      isFloat: true,
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
    },
    salePercentage: {
      in: ["body"],
      isInt: { options: { min: 0, max: 100 } },
      optional: true,
    },
    available: {
      in: ["body"],
      isBoolean: true,
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

function updateProductSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    name: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    description: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    price: {
      in: ["body"],
      isFloat: true,
      optional: true,
    },
    duration: {
      in: ["body"],
      isInt: true,
      optional: true,
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
      optional: true,
    },
    salePercentage: {
      in: ["body"],
      isInt: { options: { min: 0, max: 100 } },
      optional: true,
    },
    available: {
      in: ["body"],
      isBoolean: true,
      optional: true,
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

export { productSchema, updateProductSchema };
