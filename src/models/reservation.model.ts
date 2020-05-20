import { Model, Sequelize, DataTypes } from "sequelize";
import { Client } from "./client.model";
import { Product } from ".";

class Reservation extends Model {
  public id!: number;
  public date: Date;
  public reminderToClient: boolean;
  public cancelable: boolean;
  public completed: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function init(sequelize: Sequelize) {
  Reservation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      reminderToClient: { type: DataTypes.BOOLEAN },
      cancelable: { type: DataTypes.BOOLEAN },
      completed: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "reservation",
      sequelize: sequelize,
      modelName: "reservation",
    }
  );
}

function defineRelations() {
  Reservation.belongsTo(Client);

  Reservation.belongsToMany(Product, { through: "reservation_product" });
}

export { init, defineRelations, Reservation };
