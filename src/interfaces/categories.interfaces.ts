import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import { createCategorySchema } from "../schemas";

export type tCategoryRequest = z.infer<typeof createCategorySchema>;
export type tCategoryRepo = Repository<Category>;
