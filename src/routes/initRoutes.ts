import { Express } from "express";
import * as Dummy from "./dummy.routes";
import * as Vendor from "./vendor.routes";
import * as Client from "./client.routes";
import * as Business from "./business.routes";
import * as Product from "./product.routes";
import * as Schedule from "./schedule.routes";

function initRoutes(app: Express) {
  Dummy.init(app);
  Vendor.init(app);
  Client.init(app);
  Business.init(app);
  Product.init(app);
  Schedule.init(app);
}

export { initRoutes };
