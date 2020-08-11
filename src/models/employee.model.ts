import { DataTypes, Model } from "sequelize";
import { Business } from "./business.model";
import { Product } from "./product.model";

class Employee extends Model {
  public id!: number;
  public businessId!: number;
  public productId!: number;
  public name: string;
  public surname: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function init(sequelize) {
  Employee.init(
    {
      name: { type: DataTypes.STRING },
      surname: { type: DataTypes.STRING },
    },
    { tableName: "employee", modelName: "employee", sequelize }
  );
}

function defineRelations() {
  Employee.belongsTo(Business);
  Employee.belongsToMany(Product, {
    through: "product_employee",
    onDelete: "cascade",
  });
}

export { init, defineRelations, Employee };
