import { Express } from "express";
import * as Business from "./business.routes";
import * as User from "./user.routes";

function initRoutes(app: Express) {
  User.init(app);
  Business.init(app);
}

export { initRoutes };
