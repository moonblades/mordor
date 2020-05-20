import * as Dummy from "./dummy.model";
import * as Client from "./client.model";
import * as Vendor from "./vendor.model";
import * as Business from "./business.model";
import * as Product from "./product.model";
import * as Reservation from "./reservation.model";
import { Sequelize } from "sequelize";

///
function initModels(sequelize: Sequelize) {
  Client.init(sequelize);
  Reservation.init(sequelize);
  Vendor.init(sequelize);
  Business.init(sequelize);
  Product.init(sequelize);
}

///
function defineRelations() {
  Client.defineRelations();
  Reservation.defineRelations();
  Vendor.defineRelations();
  Business.defineRelations();
  Product.defineRelations();
}

export { initModels, defineRelations };
