import { Request, Response } from "express";
import firebaseApp from "../firebaseApp";
import logger from "../logger";

function verifyIdToken(req: Request, res: Response, next) {
  const token = req.headers["firebase-token"] as string;

  firebaseApp
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      logger.info(`Authenticated ${uid}`);
      // return res.status(200);
    })
    .catch(function (error) {
      return res.status(401).json({ error: error });
    });

  next();
}

export { verifyIdToken };
