import { config } from "../config/db.config";
import { Sequelize } from "sequelize";
import { initModels, defineRelations } from "./init";
import { Dummy } from "./dummy.model";
import { Client } from "./client.model";
import { Vendor } from "./vendor.model";
import { Business } from "./business.model";
import { Product } from "./product.model";
import { Schedule } from "./schedule.model";
import { Vacation } from "./vacation.model";

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

// make sure the connection is successful
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

initModels(sequelize);
defineRelations();

const db = {
  sequelize,
};

export { db, Dummy, Client, Vendor, Business, Product, Schedule, Vacation };
