import { Request, Response, NextFunction } from "express";
import { Business, Vacation } from "../../models";
import { InternalServerError, BusinessNotFoundError } from "../../exceptions";

function createVacation(req: Request, res: Response, next: NextFunction) {
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

export default createVacation;
