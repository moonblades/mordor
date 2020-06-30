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
import { Product } from "./product.model";
import { Reservation } from "./reservation.model";
import { Schedule } from "./schedule.model";
import { User } from "./user.model";
import { Vacation } from "./vacation.model";
import { Employee } from "./employee.model";

class Business extends Model {
  public id!: number;
  public userId!: number;
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
  public industry: string;
  public cancellationTime: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>; // Note the null assertions!
  public addProduct!: HasManyAddAssociationMixin<Product, number>;
  public hasProduct!: HasManyHasAssociationMixin<Product, number>;
  public countProducts!: HasManyCountAssociationsMixin;
  public createProduct!: HasManyCreateAssociationMixin<Product>;

  // Note this is optional since it's only populated when explicitly requested in code
  public readonly products?: Product[];

  public getSchedules!: HasManyGetAssociationsMixin<Schedule>; // Note the null assertions!
  public addSchedule!: HasManyAddAssociationMixin<Schedule, number>;
  public hasSchedule!: HasManyHasAssociationMixin<Schedule, number>;
  public countSchedules!: HasManyCountAssociationsMixin;
  public createSchedule!: HasManyCreateAssociationMixin<Schedule>;

  // Note this is optional since it's only populated when explicitly requested in code
  public readonly schedules?: Schedule[];

  public getVacations!: HasManyGetAssociationsMixin<Vacation>; // Note the null assertions!
  public addVacation!: HasManyAddAssociationMixin<Vacation, number>;
  public hasVacation!: HasManyHasAssociationMixin<Vacation, number>;
  public countVacations!: HasManyCountAssociationsMixin;
  public createVacation!: HasManyCreateAssociationMixin<Vacation>;

  // Note this is optional since it's only populated when explicitly requested in code
  public readonly vacations?: Vacation[];

  public getReservations!: HasManyGetAssociationsMixin<Reservation>; // Note the null assertions!
  public addReservation!: HasManyAddAssociationMixin<Reservation, number>;
  public hasReservation!: HasManyHasAssociationMixin<Reservation, number>;
  public countReservations!: HasManyCountAssociationsMixin;
  public createReservation!: HasManyCreateAssociationMixin<Reservation>;

  public readonly reservations?: Reservation[];

  public getUsers!: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public hasUser!: HasManyHasAssociationMixin<User, number>;
  public countUsers!: HasManyCountAssociationsMixin;
  public createUser!: HasManyCreateAssociationMixin<User>;

  public readonly users?: User[];

  public getEmployees!: HasManyGetAssociationsMixin<Employee>; // Note the null assertions!
  public addEmployee!: HasManyAddAssociationMixin<Employee, number>;
  public hasEmployee!: HasManyHasAssociationMixin<Employee, number>;
  public countEmployees!: HasManyCountAssociationsMixin;
  public createEmployee!: HasManyCreateAssociationMixin<Employee>;

  public readonly employees?: Employee[];

  public static associations: {
    products: Association<Business, Product>;
    schedules: Association<Business, Schedule>;
    vacations: Association<Business, Vacation>;
    reservations: Association<Business, Reservation>;
    users: Association<Business, User>;
    employess: Association<Business, Employee>;
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
      industry: { type: DataTypes.STRING },
      cancellationTime: { type: DataTypes.INTEGER.UNSIGNED },
    },
    {
      tableName: "business",
      modelName: "business",
      sequelize,
    }
  );
}

function defineRelations() {
  Business.belongsTo(User);

  Business.hasMany(Product);
  Business.hasMany(Schedule);
  Business.hasMany(Vacation);
  Business.hasMany(Reservation);
  Business.hasMany(Employee);

  Business.belongsToMany(User, {
    through: "favorite",
  });
}

export { init, defineRelations, Business };
