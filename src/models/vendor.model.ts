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
import { Business } from "./business.model";

class Vendor extends Model {
  public id!: number;
  public email!: string;
  public displayName: string;
  public imageUrl: string;
  public name: string;
  public surname: string;
  public password: string;
  public phoneNumber: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getBusinesses!: HasManyGetAssociationsMixin<Business>; // Note the null assertions!
  public addBusiness!: HasManyAddAssociationMixin<Business, number>;
  public hasBusiness!: HasManyHasAssociationMixin<Business, number>;
  public countBusinesses!: HasManyCountAssociationsMixin;
  public createBusiness!: HasManyCreateAssociationMixin<Business>;

  public readonly businesses?: Business[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    businesses: Association<Vendor, Business>;
  };
}

// https://sequelize.org/v5/manual/typescript.html
function init(sequelize: Sequelize) {
  Vendor.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "vendor",
      modelName: "vendor",
      sequelize: sequelize,
    }
  );
}

function defineRelations() {
  Vendor.hasMany(Business);
}

export { init, defineRelations, Vendor };
