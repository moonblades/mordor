import { Model, Sequelize, DataTypes, Association } from "sequelize";
import { Business } from "./business.model";

class Schedule extends Model {
  public id!: number;
  public businessId!: number;
  public dayOfWeek!: number;
  public startTime!: number;
  public time!: number;
}

function init(sequelize) {
  Schedule.init(
    {
      dayOfWeek: {
        type: DataTypes.ENUM,
        values: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "schedule",
      modelName: "schedule",
      sequelize,
    }
  );
}

function defineRelations() {
  Schedule.belongsTo(Business);
}

export { init, defineRelations, Schedule };
