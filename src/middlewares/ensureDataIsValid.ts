import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValid =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const validatedData = schema.parse(request.body);

    request.body = validatedData;

    next();
  };

export default ensureDataIsValid;
