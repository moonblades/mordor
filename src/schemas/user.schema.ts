import { checkSchema } from "express-validator";

function userSchema() {
  return checkSchema({
    // id: {
    //   in: ["params"],
    //   isInt: true,
    //   toInt: true,
    //   // optional: true,
    // },
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

export { userSchema };
