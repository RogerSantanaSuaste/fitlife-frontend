import { z } from "zod";
import { routineSchema } from "./routines";

export const postAssignRoutineSchema = z.object({
    usuario_id: z.string(),
    rutina_id: z.string(),
})

export type PostAssignRoutine = z.infer<typeof postAssignRoutineSchema>;

export const postAssignRoutineResponseSchema = z.object({
    id: z.number(),
    usuario_id: z.string(),
    rutina_id: z.string(),
    assignedAt: z.string(), // ISO date string
    isActive: z.boolean(),
    createdAt: z.string(),
})

export type PostAsssignRoutineResponse = z.infer<typeof postAssignRoutineResponseSchema>;

export const AssignedRoutinesResponseSchema = z.object({
    userRoutineId: z.number(),
    userId: z.string(),
    assignedAt: z.string(), // ISO date string
    isActive: z.boolean(),
    routine: routineSchema,
})

export type AssignedRoutinesResponse = z.infer<typeof AssignedRoutinesResponseSchema>;