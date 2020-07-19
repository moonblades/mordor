import { checkSchema } from "express-validator";

function vacationSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    dateStart: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
    },
    dateEnd: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
    },
  });
}

function updateVacationSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    dateStart: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      optional: true,
    },
    dateEnd: {
      in: ["body"],
      isISO8601: true,
      toDate: true,
      optional: true,
    },
  });
}

export { vacationSchema, updateVacationSchema };
