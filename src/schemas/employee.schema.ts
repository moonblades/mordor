import { checkSchema } from "express-validator";

function employeeSchema() {
  return checkSchema({
    id: {
      in: ["params"],
      isInt: true,
    },
    name: {
      in: ["body"],
      isString: true,
    },
    surname: {
      in: ["body"],
      isString: true,
    },
  });
}

export { employeeSchema };
