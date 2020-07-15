import sequelize, {
  Reservation,
  Product,
  User,
  Business,
  Employee,
} from "../models";
import { sequelizeLogger } from "../logger";

async function truncateAllTables() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
    raw: true,
  }); //

  await sequelize.query("TRUNCATE `reservation_product`");
  sequelizeLogger.info(`Cleaned up ReservationProduct table`);

  await sequelize.query("TRUNCATE `customer`");
  sequelizeLogger.info(`Cleaned up Customer table`);

  await sequelize.query("TRUNCATE `favorite`");
  sequelizeLogger.info(`Cleaned up Favorite table`);

  await sequelize.query("TRUNCATE `schedule`");
  sequelizeLogger.info(`Cleaned up Schedule table`);

  await sequelize.query("TRUNCATE `vacation`");
  sequelizeLogger.info(`Cleaned up Vacation table`);

  await Reservation.destroy({
    // where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  sequelizeLogger.info(`Cleaned up Reservation table`);

  await Product.destroy({
    // where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  sequelizeLogger.info(`Cleaned up Product table`);

  await User.destroy({
    // where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  sequelizeLogger.info(`Cleaned up User table`);

  await Business.destroy({
    // where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  sequelizeLogger.info(`Cleaned up Business table`);

  await Employee.destroy({
    // where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  sequelizeLogger.info(`Cleaned up Employee table`);
}

export { truncateAllTables };
