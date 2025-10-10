import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email("Dirección de correo electrónico no válida"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    gender: z.enum(['masculino', 'femenino', 'otro'], "Género no válido"),
    returnSecureToken: z.boolean().optional(),
})

export type SignUpInput = z.infer<typeof signUpSchema>;

export const userSignUpResponseSchema = z.object({
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

export type userSignUpResponse = z.infer<typeof userSignUpResponseSchema>;