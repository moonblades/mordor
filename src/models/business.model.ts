import { Model, Sequelize, DataTypes } from "sequelize";

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
}

function init(sequelize: Sequelize) {
  Business.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      vendorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
      sequelize: sequelize,
    }
  );
}

export { init, Business };
