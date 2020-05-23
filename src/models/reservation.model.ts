import {
  Model,
  Sequelize,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from "sequelize";
import { Client } from "./client.model";
import { Business } from "./business.model";
import { Product } from ".";

class Reservation extends Model {
  public id!: number;
  public clientId!: number;
  public businessId!: number;
  public date: Date;
  public reminderToClient: boolean;
  public cancelable: boolean;
  public completed: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>; // Note the null assertions!
  public addProduct!: HasManyAddAssociationMixin<Product, number>;
  public hasProduct!: HasManyHasAssociationMixin<Product, number>;
  public countProducts!: HasManyCountAssociationsMixin;
  public createProduct!: HasManyCreateAssociationMixin<Product>;

  public readonly products?: Product[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    products: Association<Reservation, Product>;
  };
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
  Reservation.belongsTo(Business);

  Reservation.belongsToMany(Product, { through: "reservation_product" });
}

export { init, defineRelations, Reservation };
