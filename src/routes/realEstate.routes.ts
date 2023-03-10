import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstatesController,
} from "../controllers";
import {
  ensureDataIsValid,
  ensureHavePermission,
  ensureTokenIsValid,
} from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  ensureDataIsValid(createRealEstateSchema),
  createRealEstateController
);

realEstateRoutes.get("", listAllRealEstatesController);

export default realEstateRoutes;
