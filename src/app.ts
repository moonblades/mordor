import * as bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import errorHandler from "errorhandler";
import express from "express";
import { config, IDBConfigEntry } from "./config/db.config";
import { logger } from "./logger";
import sequelize, { connect } from "./models";
import { initRoutes } from "./routes/initRoutes";
import helmet from "helmet";
import { verifyIdToken } from "./middlewares/verifyIdToken";
import compression from "compression";

dotenv.config();

const dbConfig = config[process.env.SERVER_ENVIRONMENT] as IDBConfigEntry;

const app = express();
const corsOptions: CorsOptions = {
  origin: `http://${dbConfig.host}:${dbConfig.port}`,
};

app.use(compression());

app.use(helmet());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.SERVER_ENVIRONMENT !== "test") {
  connect(sequelize);
}

// provides full stack - remove for production
if (process.env.SERVER_ENVIRONMENT !== "production") {
  app.use(errorHandler());
}

app.use(verifyIdToken);

// api test route
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Mordor!" });
});

initRoutes(app);

logger.info("App initialized");

export default app;
