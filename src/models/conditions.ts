import { z } from "zod";

export const conditionSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
})

export type Conditions = z.infer<typeof conditionSchema>;