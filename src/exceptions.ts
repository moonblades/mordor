//
class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

//
class BadRequestError extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

//
class InternalServerError extends HttpException {
  constructor(message: string) {
    super(500, `Internal server error: ${message}`);
  }
}

//
class UserNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `User with id ${id} not found`);
  }
}

//
class BusinessNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Business with id ${id} not found`);
  }
}

//
class ProductNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Product with id ${id} not found`);
  }
}

class ReservationNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Reservation with id ${id} not found`);
  }
}

class ScheduleNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Schedule with id ${id} not found`);
  }
}

class VacationNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Vacation with id ${id} not found`);
  }
}

class EmployeeNotFoundError extends HttpException {
  constructor(id: string) {
    super(404, `Employee with id ${id} not found`);
  }
}

export {
  HttpException,
  BadRequestError,
  InternalServerError,
  UserNotFoundError,
  BusinessNotFoundError,
  ProductNotFoundError,
  ReservationNotFoundError,
  ScheduleNotFoundError,
  VacationNotFoundError,
  EmployeeNotFoundError,
};
