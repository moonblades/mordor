import { Sequelize } from "sequelize";
import * as Business from "./business.model";
import * as Product from "./product.model";
import * as Reservation from "./reservation.model";
import * as Schedule from "./schedule.model";
import * as User from "./user.model";
import * as Vacation from "./vacation.model";
import * as Employee from "./employee.model";
import * as Reminder from "./reminder.model";
import * as Customer from "./customer.model";
import * as Favorite from "./favorite.model";

///
function initModels(sequelize: Sequelize) {
  User.init(sequelize);
  Reservation.init(sequelize);
  Business.init(sequelize);
  Product.init(sequelize);
  Schedule.init(sequelize);
  Vacation.init(sequelize);
  Employee.init(sequelize);
  Reminder.init(sequelize);
  Customer.init(sequelize);
  Favorite.init(sequelize);
}

///
function defineRelations() {
  User.defineRelations();
  Reservation.defineRelations();
  Business.defineRelations();
  Product.defineRelations();
  Schedule.defineRelations();
  Vacation.defineRelations();
  Employee.defineRelations();
  Reminder.defineRelations();
}

export { initModels, defineRelations };
