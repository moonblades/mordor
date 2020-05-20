import { Model, DataTypes, Sequelize } from "sequelize";

class Client extends Model {
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
}

function init(sequelize: Sequelize) {
  Client.init(
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
      tableName: "client",
      modelName: "client",
      sequelize: sequelize,
    }
  );
}

export { init, Client };
