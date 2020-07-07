import { checkSchema } from "express-validator";

function businessSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
      toInt: true,
    },
    userId: {
      in: ["body"],
      isInt: true,
      toInt: true,
    },
    vatNumber: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    phoneNumber: {
      in: ["body"],
      isString: true,
      exists: true,
    },
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
    imageUrl: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    currency: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    timeZone: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    streetAndNumber: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    postalCode: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    city: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    industry: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    cancellationTime: {
      in: ["body"],
      isInt: true,
      exists: true,
    },
  });
}

export { businessSchema };
