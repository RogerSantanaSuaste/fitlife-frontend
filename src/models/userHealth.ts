import { z } from "zod";
import { allergiesHealthUserInfoSchema, conditionsHealthUserInfoSchema } from "./allergies";

export const healthInfoSchema = z.object({
    pesoKg: z.number().min(30, "El peso debe ser al menos 30 kg").max(300, "El peso no puede exceder los 300 kg"),
    estaturaCm: z.number().min(100, "La estatura debe ser al menos 100 cm").max(250, "La estatura no puede exceder los 250 cm"),
    nivel: z.enum(["BAJO", "INTERMEDIO", "AVANZADO"]),
    alergias: z.array(z.string()),
    condiciones: z.array(z.string()),
});

export type HealthInfo = z.infer<typeof healthInfoSchema>;

export interface userHealthResponse {
    profile_completed: boolean;
}

export const healthUserResponseSchema = z.object({
    userId: z.string(),
    pesoKg: z.number(),
    estaturaCm: z.number(),
    nivel: z.enum(["BAJO", "INTERMEDIO", "AVANZADO"]),
    imc: z.number().optional(),
    categoria_imc: z.string().optional(),
    alergias: z.array(allergiesHealthUserInfoSchema),
    condiciones: z.array(conditionsHealthUserInfoSchema),
});

export type HealthUserResponse = z.infer<typeof healthUserResponseSchema>;