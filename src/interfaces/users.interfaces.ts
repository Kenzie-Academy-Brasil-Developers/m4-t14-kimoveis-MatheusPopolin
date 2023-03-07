import { Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities";
import { createUserSchema, returnUserSchema } from "../schemas";

export type tUserRepo = Repository<User>;
export type tUserRequest = z.infer<typeof createUserSchema>;
export type tUserReturn = z.infer<typeof returnUserSchema>;
