import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  listCategoryRealEstatesController,
} from "../controllers";
import {
  ensureDataIsValid,
  ensureHavePermission,
  ensureTokenIsValid,
} from "../middlewares";
import { createCategorySchema } from "../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  ensureDataIsValid(createCategorySchema),
  createCategoryController
);

categoriesRoutes.get("", listAllCategoriesController);

categoriesRoutes.get("/:id/realEstate", listCategoryRealEstatesController);

export default categoriesRoutes;
