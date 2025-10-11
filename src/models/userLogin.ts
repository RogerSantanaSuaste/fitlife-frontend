import { z } from "zod";

export const LogInSchema = z.object({
    email: z.string().email("Dirección de correo electrónico no válida"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    returnSecureToken: z.boolean().optional().default(true),
});

export const LogInResponseSchema = z.object({
    idToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.string(),
    localId: z.string(),
    email: z.string().email(),
    userId: z.string().uuid(),
    profile_completed: z.boolean(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(["masculino", "femenino", "otro"]),
});

export type LogInInput = z.infer<typeof LogInSchema>;

export type LogInResponse = z.infer<typeof LogInResponseSchema>;