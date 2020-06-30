import { Model, DataTypes } from "sequelize";
import { User } from "./user.model";
import { Business } from "./business.model";

class Favorite extends Model {
  public userId!: number;
  public businessId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function init(sequelize) {
  Favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: User,
          key: "id",
        },
      },
      businessId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: Business,
          key: "id",
        },
      },
    },
    {
      tableName: "favorite",
      modelName: "favorite",
      sequelize,
    }
  );
}

export { init, Favorite };
