import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Sequelize,
} from "sequelize";
import { Business } from "./business.model";
import { Reservation } from "./reservation.model";

class User extends Model {
  public id!: number;
  public email!: string;
  public displayName: string;
  public imageUrl: string;
  public name: string;
  public surname: string;
  public password: string;
  public phoneNumber: string;
  public streetAndNumber: string;
  public city: string;
  public postalCode: number;
  public receiveNotification: boolean;
  public anonymous: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getReservations!: HasManyGetAssociationsMixin<Reservation>; // Note the null assertions!
  public addReservation!: HasManyAddAssociationMixin<Reservation, number>;
  public hasReservation!: HasManyHasAssociationMixin<Reservation, number>;
  public countReservations!: HasManyCountAssociationsMixin;
  public createReservation!: HasManyCreateAssociationMixin<Reservation>;

  // Note this is optional since it's only populated when explicitly requested in code
  public readonly reservations?: Reservation[];

  public getBusinesses!: HasManyGetAssociationsMixin<Business>; // Note the null assertions!
  public addBusiness!: HasManyAddAssociationMixin<Business, number>;
  public hasBusiness!: HasManyHasAssociationMixin<Business, number>;
  public countBusinesses!: HasManyCountAssociationsMixin;
  public createBusiness!: HasManyCreateAssociationMixin<Business>;

  // Note this is optional since it's only populated when explicitly requested in code
  public readonly businesses?: Business[];

  public static associations: {
    reservations: Association<User, Reservation>;
    businesses: Association<User, Business>;
  };
}

function init(sequelize: Sequelize) {
  User.init(
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
      streetAndNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      receiveNotification: {
        type: DataTypes.BOOLEAN,
      },
      anonymous: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "user",
      modelName: "user",
      sequelize,
    }
  );
}

function defineRelations() {
  User.hasMany(Reservation);
  User.hasMany(Business);
  User.belongsToMany(Business, {
    through: "customer",
    onDelete: "cascade",
  });
}

export { init, defineRelations, User };
