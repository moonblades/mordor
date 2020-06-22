import * as admin from "firebase-admin";
import logger from "./logger";

const firebaseApp = admin.initializeApp(); // Retrieves credentials in FIREBASE_CONFIG env
logger.info("Firebase app initialized");

export default firebaseApp;

// passami il json
