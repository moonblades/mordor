import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../models";
import {
  InternalServerError,
  BusinessNotFoundError,
  VacationNotFoundError,
  HttpException,
} from "../exceptions";

function create(req: Request, res: Response, next: NextFunction) {
  const { dateStart, dateEnd } = req.body;
  const id = req.params.id;

  Business.findByPk(id).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(id));
      return;
    }

    const vacation = {
      businessId: id,
      dateStart,
      dateEnd,
    };

    Vacation.create(vacation)
      .then((vacation) => {
        return res.status(201).send(vacation);
      })
      .catch((err) => {
        next(new InternalServerError(err.message));
        return;
      });
  });
}

function findAll(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  Business.findByPk(id).then((business: Business) => {
    if (!business) {
      next(new BusinessNotFoundError(id));
      return;
    }

    Vacation.findAll({
      where: {
        businessId: id,
      },
    })
      .then((vacations) => {
        return res.send(vacations);
      })
      .catch((err) => {
        next(new InternalServerError(err.message));
        return;
      });
  });
}

function findOne(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.findByPk(vacationId).then((vacation: Vacation) => {
        if (!vacation) {
          next(new VacationNotFoundError(vacationId));
          return;
        }

        return res.status(200).send(vacation);
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function update(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.update(req.body, {
        where: { id: vacationId },
      }).then((num) => {
        if (num[0] === 1) {
          return res.status(200).send({
            message: "Vacation was updated successfully.",
          });
        } else {
          if (Object.keys(req.body).length === 0) {
            next(new HttpException(400, "Request's body cannot be empty"));
            return;
          } else {
            next(new VacationNotFoundError(vacationId));
            return;
          }
        }
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteOne(req: Request, res: Response, next: NextFunction) {
  const { id, vacationId } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }

      Vacation.destroy({
        where: { id: vacationId },
      }).then((num) => {
        if (num[0] === 1) {
          return res.status(200).send({
            message: "Vacation was deleted successfully.",
          });
        } else {
          next(new VacationNotFoundError(vacationId));
          return;
        }
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

function deleteAll(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Business.findByPk(id)
    .then((business: Business) => {
      if (!business) {
        next(new BusinessNotFoundError(id));
        return;
      }
      Vacation.destroy({
        where: { businessId: business.id },
        truncate: false,
      }).then((nums) => {
        return res.status(200).send({
          message: `${nums} Vacations were deleted successfully!`,
        });
      });
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
      return;
    });
}

export { create, findAll, findOne, update, deleteOne, deleteAll };
