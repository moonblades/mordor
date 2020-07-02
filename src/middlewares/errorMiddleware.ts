import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions";

//
function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).send({
    status,
    message,
  });
  // for future reference: next() is NOT called here because error handling middleware should be invoked last
}

export default errorMiddleware;
