import { truncateAllTables } from "../../../test/truncateTables";
import addFavorite from "./addFavorite.spec";
import createBusiness from "./createBusiness.spec";
import createReservation from "./createReservation.spec";
import createUser from "./createUser.spec";
import deleteAll from "./deleteAll.spec";
import deleteAllBusinesses from "./deleteAllBusinesses.spec";
import deleteAllReservations from "./deleteAllReservations.spec";
import deleteBusiness from "./deleteBusiness.spec";
import deleteOne from "./deleteOne.spec";
import deleteOneReservation from "./deleteOneReservation.spec";
import findAll from "./findAll.spec";
import findAllBusinesses from "./findAllBusinesses.spec";
import findAllFavorites from "./findAllFavorites.spec";
import findAllReservations from "./findAllReservations.spec";
import findOne from "./findOne.spec";
import updateOne from "./updateOne.spec";
import updateOneBusiness from "./updateOneBusiness.spec";
import updateOneReservation from "./updateOneReservation.spec";

beforeEach(async (done) => {
  await truncateAllTables();
  done();
});

describe("User controller", () => {
  it("should add a favorite", addFavorite);
  it("should create a business", createBusiness);
  it("should create a reservation", createReservation);
  it("should create a user", createUser);
  it("should delete all users", deleteAll);
  it("should delete all businesses", deleteAllBusinesses);
  it("should delete all reservations", deleteAllReservations);
  it("should delete one business", deleteBusiness);
  it("should delete one user", deleteOne);
  it("should delete one reservation", deleteOneReservation);
  it("should find all users", findAll);
  it("should find all businesses", findAllBusinesses);
  it("should find all favorites", findAllFavorites);
  it("should find all reservations", findAllReservations);
  it("should find one user", findOne);
  it("should update one user", updateOne);
  it("should update one business", updateOneBusiness);
  it("should update one reservation", updateOneReservation);
});
