import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../logger";

function typeValidation(req: Request, res: Response, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      logger.error(JSON.stringify(error));
    });
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export { typeValidation };
