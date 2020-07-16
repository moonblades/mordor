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

export { vacationSchema };
