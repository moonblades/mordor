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
import { Client } from "./client.model";
import { Schedule } from "./schedule.model";
import { Vacation } from "./vacation.model";
import { Reservation } from "./reservation.model";

class Business extends Model {
  public id!: number;
  public vendorId!: number;
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

  public getSchedules!: HasManyGetAssociationsMixin<Schedule>; // Note the null assertions!
  public addSchedule!: HasManyAddAssociationMixin<Schedule, number>;
  public hasSchedule!: HasManyHasAssociationMixin<Schedule, number>;
  public countSchedules!: HasManyCountAssociationsMixin;
  public createSchedule!: HasManyCreateAssociationMixin<Schedule>;

  public readonly schedules?: Schedule[]; // Note this is optional since it's only populated when explicitly requested in code

  public getVacations!: HasManyGetAssociationsMixin<Vacation>; // Note the null assertions!
  public addVacation!: HasManyAddAssociationMixin<Vacation, number>;
  public hasVacation!: HasManyHasAssociationMixin<Vacation, number>;
  public countVacations!: HasManyCountAssociationsMixin;
  public createVacation!: HasManyCreateAssociationMixin<Vacation>;

  public readonly vacations?: Vacation[]; // Note this is optional since it's only populated when explicitly requested in code

  public getReservations!: HasManyGetAssociationsMixin<Reservation>; // Note the null assertions!
  public addReservation!: HasManyAddAssociationMixin<Reservation, number>;
  public hasReservation!: HasManyHasAssociationMixin<Reservation, number>;
  public countReservations!: HasManyCountAssociationsMixin;
  public createReservation!: HasManyCreateAssociationMixin<Reservation>;

  public readonly reservations?: Reservation[];

  public getClients!: HasManyGetAssociationsMixin<Client>; // Note the null assertions!
  public addClient!: HasManyAddAssociationMixin<Client, number>;
  public hasClient!: HasManyHasAssociationMixin<Client, number>;
  public countClients!: HasManyCountAssociationsMixin;
  public createClient!: HasManyCreateAssociationMixin<Client>;

  public readonly clients?: Client[];

  public static associations: {
    products: Association<Business, Product>;
    schedules: Association<Business, Schedule>;
    vacations: Association<Business, Vacation>;
    reservations: Association<Business, Reservation>;
    clients: Association<Business, Client>;
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
}

function defineRelations() {
  Business.belongsTo(Vendor);
  Business.hasMany(Product);
  Business.belongsToMany(Client, { through: "business_client" });
  Business.hasMany(Schedule);
  Business.hasMany(Vacation);
  Business.hasMany(Reservation);
}

export { init, defineRelations, Business };
