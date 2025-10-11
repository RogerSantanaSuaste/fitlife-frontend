import { z } from "zod";

export const allergySchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
})

export type Allergy = z.infer<typeof allergySchema>;