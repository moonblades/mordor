import { config } from "../config/db.config";
import { Sequelize } from "sequelize";
import { initModels, Dummy } from "./dummy.model";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: "mariadb",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

initModels(sequelize);

const db = {
  sequelize,
};

export { db, Dummy };
