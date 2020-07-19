import { checkSchema } from "express-validator";

function userSchema() {
  return checkSchema({
    email: {
      in: ["body"],
      isString: true,
    },
    displayName: {
      in: ["body"],
      isString: true,
    },
    imageUrl: {
      in: ["body"],
      isString: true,
    },
    name: {
      in: ["body"],
      isString: true,
    },
    surname: {
      in: ["body"],
      isString: true,
    },
    password: {
      in: ["body"],
      isString: true,
    },
    phoneNumber: {
      in: ["body"],
      isString: true,
    },
    streetAndNumber: {
      in: ["body"],
      isString: true,
    },
    city: {
      in: ["body"],
      isString: true,
    },
    postalCode: {
      in: ["body"],
      isString: true,
    },
    receiveNotification: {
      in: ["body"],
      isBoolean: true,
    },
    anonymous: {
      in: ["body"],
      isBoolean: true,
    },
  });
}

function updateUserSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    email: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    displayName: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    imageUrl: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    name: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    surname: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    password: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    phoneNumber: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    streetAndNumber: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    city: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    postalCode: {
      in: ["body"],
      isString: true,
      optional: true,
    },
    receiveNotification: {
      in: ["body"],
      isBoolean: true,
      optional: true,
    },
    anonymous: {
      in: ["body"],
      isBoolean: true,
      optional: true,
    },
  });
}

export { userSchema, updateUserSchema };
