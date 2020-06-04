import * as winston from "winston";
const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ lvl, msg, lbl, ts }) => {
  return `${ts} [${lbl}] ${lvl}: ${msg}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "MORDOR" }), timestamp(), logFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

export default logger;
