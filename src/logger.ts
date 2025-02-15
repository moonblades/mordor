import * as winston from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, label, printf, colorize } = winston.format;

// tslint:disable-next-line: no-shadowed-variable
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const transportError = new winston.transports.DailyRotateFile({
  filename: "mordor-%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: "logs",
  level: "error",
});
const transportCombined = new winston.transports.DailyRotateFile({
  filename: "mordor-%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: "logs",
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "MORDOR" }), timestamp(), logFormat),
  defaultMeta: { service: "user-service" },
  transports: [transportError, transportCombined],
});

if (process.env.SERVER_ENVIRONMENT === "development") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(),
        label({ label: "MORDOR" }),
        timestamp(),
        logFormat
      ),
    })
  );
}

// Sequelize dedicated logs
const transportSequelize = new winston.transports.DailyRotateFile({
  filename: "mordor-%DATE%-sequelize.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: "logs",
  level: "debug",
});

const sequelizeLogger = winston.createLogger({
  level: "debug",
  format: combine(label({ label: "MORDOR" }), timestamp(), logFormat),
  defaultMeta: { service: "user-service" },
  transports: [transportSequelize],
});

export { logger, sequelizeLogger };
