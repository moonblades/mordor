import * as Dummy from "./dummy.model";
import * as Client from "./client.model";
import * as Vendor from "./vendor.model";
import * as Business from "./business.model";
import { Sequelize } from "sequelize";

function initModels(sequelize: Sequelize) {
  Dummy.init(sequelize);
  Client.init(sequelize);
  Business.init(sequelize);
  Vendor.init(sequelize);
}

export { initModels };
