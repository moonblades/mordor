import { Model, Sequelize, DataTypes, Association } from "sequelize";
import { Business } from "./business.model";

class Vacation extends Model {
  public id!: number;
  public businessId!: number;
  public dateStart!: Date;
  public dateEnd!: Date;
}

function init(sequelize) {
  Vacation.init(
    {
      dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "vacation",
      sequelize: sequelize,
      modelName: "vacation",
    }
  );
}

function defineRelations() {
  Vacation.belongsTo(Business);
}

export { init, defineRelations, Vacation };
