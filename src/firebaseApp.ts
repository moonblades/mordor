import * as admin from "firebase-admin";
import logger from "./logger";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://reservify-9813e.firebaseio.com",
});

logger.info("Firebase app initialized");

export default firebaseApp;
