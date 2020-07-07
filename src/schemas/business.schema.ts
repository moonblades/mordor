import { checkSchema } from "express-validator";

function businessSchema() {
  return checkSchema({
    vatNumber: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    phoneNumber: {
      in: ["body"],
      isString: true,
      optional: true,
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
    imageUrl: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    currency: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    timeZone: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    streetAndNumber: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    postalCode: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    city: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    industry: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    cancelationTime: {
      in: ["body"],
      isInt: true,
      optional: true,
    },
  });
}

export { businessSchema };
