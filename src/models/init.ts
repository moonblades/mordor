import * as Dummy from "./dummy.model";
import * as Client from "./client.model";
import * as Vendor from "./vendor.model";
import * as Business from "./business.model";
import * as Product from "./product.model";
import { Sequelize } from "sequelize";

///
function initModels(sequelize: Sequelize) {
  Dummy.init(sequelize);
  Client.init(sequelize);
  Product.init(sequelize);
  Vendor.init(sequelize);
  Business.init(sequelize);
}

///
function defineRelations() {
  Vendor.defineRelations();
  Business.defineRelations();
}

export { initModels, defineRelations };
