import { exerciseSchema } from "./exercises";
import { foodSchema } from "./foods";
import { z } from "zod";

// Enum dias de la semana en mayuscula
export const daysOfWeek = z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"]);

export const routineSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    dias: z.array(daysOfWeek),
    ejercicios: z.array(exerciseSchema), 
    alimentos: z.array(foodSchema),
    isPublic: z.boolean().optional(),
})

export type Routine = z.infer<typeof routineSchema>;