import { Model, Sequelize, DataTypes } from "sequelize";
import { Business } from "./business.model";
import { Reservation } from "./reservation.model";

class Product extends Model {
  public id!: number;
  public businessId: number;
  public name: string;
  public description: string;
  public price: number;
  public duration: number;
  public preparation: number;
  public postProcessing: number;
  public weight: number;
  public sale: boolean;
  public salePercentage: number;
  public available: boolean;
  public whenAvailable: Date;
  public cancelationTime: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function init(sequelize: Sequelize) {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      duration: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      preparation: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      postProcessing: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      sale: {
        type: DataTypes.BOOLEAN,
      },
      salePercentage: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
      whenAvailable: {
        type: DataTypes.DATE,
      },
      cancelationTime: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      tableName: "product",
      sequelize: sequelize,
      modelName: "product",
    }
  );
}

function defineRelations() {
  Product.belongsTo(Business);

  Product.belongsToMany(Reservation, {
    through: "reservation_product",
    onDelete: "cascade",
  });
}

export { init, defineRelations, Product };
