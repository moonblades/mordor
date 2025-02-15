import { Sequelize } from "sequelize";
import { config, IDBConfigEntry } from "../config/db.config";
import { logger, sequelizeLogger } from "../logger";
import { Business } from "./business.model";
import { defineRelations, initModels } from "./init";
import { Product } from "./product.model";
import { Reservation } from "./reservation.model";
import { Schedule } from "./schedule.model";
import { User } from "./user.model";
import { Vacation } from "./vacation.model";
import { Employee } from "./employee.model";
import { Customer } from "./customer.model";
import { Favorite } from "./favorite.model";

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
    logging: (sql: string) => sequelizeLogger.debug(sql),
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
  User,
  Business,
  Product,
  Schedule,
  Vacation,
  Reservation,
  Employee,
  Favorite,
  Customer,
};
