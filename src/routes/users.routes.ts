import { Router } from "express";
import { createUserController, listAllUsersController } from "../controllers";
import {
  ensureDataIsValid,
  ensureEmailIsUnused,
  ensureHavePermission,
  ensureTokenIsValid,
} from "../middlewares";
import { createUserSchema } from "../schemas";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(createUserSchema),
  ensureEmailIsUnused,
  createUserController
);

usersRoutes.get(
  "",
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  listAllUsersController
);
