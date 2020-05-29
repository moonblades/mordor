import app from "./app";
import logger from "./logger";

// start Express server.
const PORT = process.env.SERVER_PORT || 8080;
const server = app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}...`);
  logger.info("Press CTRL-C to stop\n");

  process.on("SIGINT", () => {
    logger.info("\nCaught interrupt signal");
    process.exit();
  });
});

export default server;
