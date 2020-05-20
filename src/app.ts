import express from "express";
import * as bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";

import { db } from "./models";
import { initRoutes } from "./routes/initRoutes";

const app = express();

var corsOptions: CorsOptions = {
  origin: `http://${process.env.DB_HOST}:${process.env.DB_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// update existing tables
// db.sequelize.sync();
// // drop the tables if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mordor!" });
});

initRoutes(app);

export default app;
