import sequelize, { connect } from "../models";

beforeAll(async (done) => {
  await connect(sequelize);
  done();
});
