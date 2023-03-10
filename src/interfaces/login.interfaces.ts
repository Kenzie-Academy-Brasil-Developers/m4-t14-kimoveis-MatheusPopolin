import { z } from "zod";
import { loginSchema } from "../schemas";

export type tLoginRequest = z.infer<typeof loginSchema>;
