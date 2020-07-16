import { checkSchema } from "express-validator";

function reservationSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
      toInt: true,
    },
    // userId: {
    //   in: ["body"],
    //   isInt: true,
    //   toInt: true,
    //   // optional: true,
    // },
    date: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      // optional: true,
    },
    reminderToUser: {
      in: ["body"],
      isBoolean: true,
      // optional: true,
    },
    cancelable: {
      in: ["body"],
      isBoolean: true,
      // optional: true,
    },
    completed: {
      in: ["body"],
      isBoolean: true,
      // optional: true,
    },
  });
}

function updateReservationSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
      toInt: true,
    },
    date: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      optional: true,
    },
    reminderToUser: {
      in: ["body"],
      isBoolean: true,
      optional: true,
    },
    cancelable: {
      in: ["body"],
      isBoolean: true,
      optional: true,
    },
    completed: {
      in: ["body"],
      isBoolean: true,
      optional: true,
    },
  });
}

export { reservationSchema, updateReservationSchema };
