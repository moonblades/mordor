import { checkSchema } from "express-validator";

function userSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
      toInt: true,
    },
    email: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    displayName: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    imageUrl: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    name: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    surname: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    password: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    phoneNumber: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    streetAndNumber: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    city: {
      in: ["body"],
      isString: true,
      exists: true,
    },
    postalCode: {
      in: ["body"],
      isString: true,
      exists: true,
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

export { userSchema };
