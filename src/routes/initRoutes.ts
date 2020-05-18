import { Express } from "express";
import * as Dummy from "./dummy.routes";
import * as Vendor from "./vendor.routes";

function initRoutes(app: Express) {
  Dummy.init(app);
  Vendor.init(app);
}

export { initRoutes };
