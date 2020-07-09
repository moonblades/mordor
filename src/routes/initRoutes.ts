import { Express } from "express";
import * as Business from "./business.routes";
import * as Product from "./product.routes";
import * as Reservation from "./reservation.routes";
import * as Schedule from "./schedule.routes";
import * as User from "./user.routes";
// import * as Vacation from "./vacation.routes";

function initRoutes(app: Express) {
  User.init(app);
  Business.init(app);
  Product.init(app);
  // Vacation.init(app);
  Reservation.init(app);
  Schedule.init(app);
}

export { initRoutes };
