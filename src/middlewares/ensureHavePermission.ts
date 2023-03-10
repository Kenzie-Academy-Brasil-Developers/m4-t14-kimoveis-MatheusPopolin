import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureHavePermission =
  (permission: "admin" | "ownerAndAdmin") =>
  (request: Request, response: Response, next: NextFunction): void => {
    if (permission === "admin") {
      if (!request.user.admin) {
        throw new AppError("Insufficient permission", 403);
      }
    }

    if (permission === "ownerAndAdmin") {
      if (
        !request.user.admin &&
        parseInt(request.params.id) !== request.user.id
      ) {
        throw new AppError("Insufficient permission", 403);
      }
    }

    next();
  };

export default ensureHavePermission;
