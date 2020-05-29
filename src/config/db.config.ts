import * as config from "./config.js";
import { Dialect } from "sequelize/types";

interface IDBConfigEntry {
  username: string;
  password: string | null;
  database: string;
  host: string;
  port: string | number;
  dialect: Dialect;
}

interface IDBConfig {
  development: IDBConfigEntry;
  test: IDBConfigEntry;
  production: IDBConfigEntry;
}

export { config, IDBConfigEntry, IDBConfig };
