import sequelize, {
  Reservation,
  Product,
  User,
  Business,
  Employee,
} from "../models";
import logger from "../logger";

async function truncateAllTables() {
  await sequelize.query("TRUNCATE `reservation_product`");
  logger.info(`Cleaned up ReservationProduct table`);

  await sequelize.query("TRUNCATE `customer`");
  logger.info(`Cleaned up Customer table`);

  await sequelize.query("TRUNCATE `favorite`");
  logger.info(`Cleaned up Favorite table`);

  await Reservation.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Reservation table`);

  await Product.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Product table`);

  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up User table`);

  await Business.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Business table`);

  await Employee.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  logger.info(`Cleaned up Employee table`);
}

export { truncateAllTables };
