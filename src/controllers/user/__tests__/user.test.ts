import { truncateAllTables } from "../../../test/truncateTables";
import addFavorite from "./addFavorite";
import createBusiness from "./createBusiness";
import createReservation from "./createReservation";
import createUser from "./createUser";
import deleteAll from "./deleteAll";
import deleteAllBusinesses from "./deleteAllBusinesses";
import deleteAllReservations from "./deleteAllReservations";
import deleteBusiness from "./deleteBusiness";
import deleteOne from "./deleteOne";
import deleteOneReservation from "./deleteOneReservation";
import findAll from "./findAll";
import findAllBusinesses from "./findAllBusinesses";
import findAllFavorites from "./findAllFavorites";
import findAllReservations from "./findAllReservations";
import findOne from "./findOne";
import updateOne from "./updateOne";
import updateOneBusiness from "./updateOneBusiness";
import updateOneReservation from "./updateOneReservation";

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
