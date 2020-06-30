import sequelize, { connect } from "../models";
import * as firebase from "firebase";
import "../firebaseApp";
import { logger } from "../logger";

beforeAll(async (done) => {
  await connect(sequelize);

  const firebaseConfig = {
    apiKey: "AIzaSyAsFotYUCqu9PbKMfL-YEbYt1fIbQfNqZ8",
    authDomain: "reservify-9813e.firebaseapp.com",
    databaseURL: "https://reservify-9813e.firebaseio.com",
    projectId: "reservify-9813e",
    storageBucket: "reservify-9813e.appspot.com",
    messagingSenderId: "544722675707",
    appId: "1:544722675707:web:2e3252322102e366b70d5e",
    measurementId: "G-VGCBY0GXSH",
  };

  firebase.initializeApp(firebaseConfig);
  await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.FIREBASE_TEST_EMAIL,
      process.env.FIREBASE_TEST_PASSWORD
    )
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        logger.error("Wrong password.");
      } else {
        logger.error(errorMessage);
      }
      logger.error(error);
    });

  done();
});
