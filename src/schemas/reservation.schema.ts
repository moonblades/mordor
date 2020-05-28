import { checkSchema } from "express-validator";

function reservationSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
      toInt: true,
    },
    clientId: {
      in: ["body"],
      isInt: true,
      toInt: true,
    },
    date: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      exists: true,
    },
    reminderToClient: {
      in: ["body"],
      isBoolean: true,
    },
    cancelable: {
      in: ["body"],
      isBoolean: true,
    },
    completed: {
      in: ["body"],
      isBoolean: true,
    },
  });
}

export { reservationSchema };
