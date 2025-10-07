import { z } from "zod";

export interface Allergy {
    id: string;
    slug: string;
    name: string;
    description: string;
}

export interface Conditions {
    id: string;
    slug: string;
    name: string;
    description: string;
}

export const allergySchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
});

export const conditionSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
});