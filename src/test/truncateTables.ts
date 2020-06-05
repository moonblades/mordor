import sequelize, { Reservation, Product, User, Business } from "../models";
import logger from "../logger";

async function truncateAllTables() {
  await sequelize.query("TRUNCATE `reservation_product`");
  logger.info(`Cleaned up ReservationProduct table`);

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
}

export { truncateAllTables };
