import { z } from "zod";

export const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
});
