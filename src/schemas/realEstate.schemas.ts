import { z } from "zod";

export const createRealEstateSchema = z.object({
  value: z.union([z.string(), z.number()]),
  size: z.number().int().positive(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.number(),
});
