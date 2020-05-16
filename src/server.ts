import { config } from "dotenv";
config();

import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}...`);
  console.log("Press CTRL-C to stop\n");
});

export default server;
