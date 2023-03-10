import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import { createScheduleSchema } from "../schemas";

export type tScheduleRequest = z.infer<typeof createScheduleSchema>;
export type tScheduleRepo = Repository<Schedule>;
