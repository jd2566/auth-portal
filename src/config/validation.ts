import { validate } from "class-validator";

export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = status
    Error.captureStackTrace(this, this.constructor);
  }
}

export async function validateEntity (entity) {
  const errors = await validate(entity);

  if (errors.length > 0) {
    const constraints = errors[0].constraints
    const reasons = []
    for (const key in constraints) {
      if (Object.prototype.hasOwnProperty.call(constraints, key)) {
        const reason = constraints[key];
        reasons.push(reason)
      }
    }
    const reasonString = reasons.join(',')
    throw new HttpError(`${reasonString}`, 400);
  } else {
    return true
  }
}
