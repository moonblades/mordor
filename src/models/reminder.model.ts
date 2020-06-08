import { Model, Sequelize, DataTypes } from "sequelize";
import { Product } from "./product.model";

class Reminder extends Model {
  public id!: number;
  public productId!: number;
  public remindAfter: boolean;
  public text: string;
  public minutes: number;
  public hours: number;
  public days: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function init(sequelize: Sequelize) {
  Reminder.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      remindAfter: {
        type: DataTypes.BOOLEAN,
      },
      text: { type: DataTypes.STRING },
      minutes: { type: DataTypes.INTEGER.UNSIGNED },
      hours: { type: DataTypes.INTEGER.UNSIGNED },
      days: { type: DataTypes.INTEGER.UNSIGNED },
    },
    { tableName: "reminder", modelName: "reminder", sequelize }
  );
}

function defineRelations() {
  Reminder.belongsTo(Product);
}

export { init, defineRelations, Reminder };
