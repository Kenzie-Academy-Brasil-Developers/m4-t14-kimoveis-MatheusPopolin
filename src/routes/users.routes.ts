import { Router } from "express";
import { createUserController } from "../controllers";
import { ensureDataIsValid, ensureEmailIsUnused } from "../middlewares";
import { createUserSchema } from "../schemas";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(createUserSchema),
  ensureEmailIsUnused,
  createUserController
);
