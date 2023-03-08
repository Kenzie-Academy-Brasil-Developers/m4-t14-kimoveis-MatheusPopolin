import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers";
import {
  ensureDataIsValid,
  ensureEmailIsUnused,
  ensureHavePermission,
  ensureIdExists,
  ensureTokenIsValid,
} from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas";

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

usersRoutes.patch(
  "/:id",
  ensureIdExists,
  ensureTokenIsValid,
  ensureHavePermission("ownerAndAdmin"),
  ensureDataIsValid(updateUserSchema),
  ensureEmailIsUnused,
  updateUserController
);
