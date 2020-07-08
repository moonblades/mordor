import { checkSchema } from "express-validator";

function createScheduleSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    dayOfWeek: {
      in: ["body"],
      isInt: true,
    },
    startTime: {
      in: ["body"],
      isString: true,
      matches: {
        options: "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$",
        errorMessage: "Wrong time format",
      },
    },
    time: {
      in: ["body"],
      isInt: true,
    },
  });
}

function updateScheduleSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    dayOfWeek: {
      in: ["body"],
      isInt: true,
      optional: true,
    },
    startTime: {
      in: ["body"],
      isString: true,
      matches: {
        options: "^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$",
        errorMessage: "Wrong time format",
      },
      optional: true,
    },
    time: {
      in: ["body"],
      isInt: true,
      optional: true,
    },
  });
}

export { createScheduleSchema, updateScheduleSchema };
