import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
});

export const returnUserSchema = createUserSchema
  .extend({
    id: z.number().int(),
    admin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });

export const updateUserSchema = createUserSchema
  .omit({ admin: true })
  .partial();
