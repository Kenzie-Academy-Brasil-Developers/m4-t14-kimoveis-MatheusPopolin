import { Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import { createRealEstateSchema } from "../schemas";

export type tRealEstateRequest = z.infer<typeof createRealEstateSchema>;
export type tRealEstateRepo = Repository<RealEstate>;
