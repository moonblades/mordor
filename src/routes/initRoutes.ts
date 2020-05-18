import { Express } from "express";
import * as Dummy from "./dummy.routes";
import * as Vendor from "./vendor.routes";
import * as Client from "./client.routes";

function initRoutes(app: Express) {
  Dummy.init(app);
  Vendor.init(app);
  Client.init(app);
}

export { initRoutes };
