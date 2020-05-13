import { Model, DataTypes, Sequelize } from "sequelize";

class Dummy extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public description!: string | null;
  public published!: boolean;
  public cleared!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function initModels(sequelize: Sequelize) {
  Dummy.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
      cleared: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "dummy",
      sequelize: sequelize, // passing the `sequelize` instance is required
    }
  );
}

export { initModels, Dummy };
