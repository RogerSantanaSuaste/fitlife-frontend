import { z } from "zod";
import { allergySchema } from "./allergies";
import { conditionSchema } from "./conditions";

export const allergiesConditionsResponseSchema = z.object({
    allergies: z.array(allergySchema),
    conditions: z.array(conditionSchema),
});

export type allergiesConditionsResponse = z.infer<typeof allergiesConditionsResponseSchema>;