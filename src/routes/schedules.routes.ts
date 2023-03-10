import { Router } from "express";
import {
  createScheduleController,
  listSchedulesController,
} from "../controllers";
import {
  ensureDataIsValid,
  ensureHavePermission,
  ensureTokenIsValid,
} from "../middlewares";
import { createScheduleSchema } from "../schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValid,
  ensureDataIsValid(createScheduleSchema),
  createScheduleController
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  listSchedulesController
);

export default schedulesRoutes;
