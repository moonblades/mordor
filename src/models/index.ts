import { config, IDBConfigEntry } from "../config/db.config";
import { Sequelize } from "sequelize";
import { initModels, defineRelations } from "./init";
import { Dummy } from "./dummy.model";
import { User } from "./user.model";
import { Business } from "./business.model";
import { Product } from "./product.model";
import { Schedule } from "./schedule.model";
import { Vacation } from "./vacation.model";
import { Reservation } from "./reservation.model";
import logger from "../logger";

const dbTimezone = "GMT";
const dbConfig = config[process.env.SERVER_ENVIRONMENT] as IDBConfigEntry;
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
      timezone: dbTimezone,
      connectTimeout: 30000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: (sql: string) => logger.info(sql),
  }
);

async function connect(sequelizeInstance: Sequelize) {
  try {
    initModels(sequelizeInstance);
    defineRelations();

    await sequelizeInstance.authenticate();

    if (
      process.env.SERVER_ENVIRONMENT === "development" ||
      process.env.SERVER_ENVIRONMENT === "test"
    ) {
      await sequelizeInstance.query("SET FOREIGN_KEY_CHECKS = 0", {
        raw: true,
      }); // <- must be removed

      logger.info(`Syncing database ${dbConfig.database}...`);
      await sequelizeInstance.sync({ force: true });
      logger.info("Synced.");
    }
  } catch (err) {
    logger.error("Unable to connect to the database:", err);
  }
}

export default sequelize;

export {
  connect,
  Dummy,
  User,
  Business,
  Product,
  Schedule,
  Vacation,
  Reservation,
};
