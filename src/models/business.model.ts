import {
  Model,
  Sequelize,
  DataTypes,
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import { Product } from "./product.model";
import { Vendor } from "./vendor.model";

class Business extends Model {
  public id!: number;
  public vatNumber: string;
  public phoneNumber: string;
  public name: string;
  public description: string;
  public imageUrl: string;
  public currency: string;
  public timeZone: string;
  public streetAndNumber: string;
  public postalCode: string;
  public city: string;
  //   public openingTime: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>; // Note the null assertions!
  public addProduct!: HasManyAddAssociationMixin<Product, number>;
  public hasProduct!: HasManyHasAssociationMixin<Product, number>;
  public countProducts!: HasManyCountAssociationsMixin;
  public createProduct!: HasManyCreateAssociationMixin<Product>;

  public readonly products?: Product[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    products: Association<Business, Product>;
  };
}

function init(sequelize: Sequelize) {
  Business.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      vatNumber: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      imageUrl: { type: DataTypes.STRING },
      currency: { type: DataTypes.STRING },
      timeZone: { type: DataTypes.STRING },
      streetAndNumber: { type: DataTypes.STRING },
      postalCode: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
    },
    {
      tableName: "business",
      modelName: "business",
      sequelize: sequelize,
    }
  );

  // Business.hasMany(Product);
}

function defineRelations() {
  Business.belongsTo(Vendor);
  Business.hasMany(Product);
}

export { init, defineRelations, Business };
