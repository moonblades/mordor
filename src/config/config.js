require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER_DEVELOP || "root",
    password: process.env.DB_PASSWORD_DEVELOP || null,
    database: process.env.DB_NAME_DEVELOP || "development",
    host: process.env.DB_HOST_DEVELOP || "127.0.0.1",
    port: process.env.DB_PORT_DEVELOP || 3306,
    dialect: "mariadb",
  },
  test: {
    username: process.env.DB_USER_TEST || "test",
    password: process.env.DB_PASSWORD_TEST || null,
    database: process.env.DB_NAME_TEST || "test",
    host: process.env.DB_HOST_TEST || "127.0.0.1",
    port: process.env.DB_PORT_TEST || 3306,
    dialect: "mariadb",
  },
  production: {
    username: process.env.DB_USER_PROD || "root",
    password: process.env.DB_PASSWORD_PROD || null,
    database: process.env.DB_NAME_PROD || "production",
    host: process.env.DB_HOST_PROD || "127.0.0.1",
    port: process.env.DB_PORT_PROD || 3306,
    dialect: "mariadb",
  },
};
