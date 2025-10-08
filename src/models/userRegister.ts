import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Dirección de correo electrónico no válida"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    gender: z.enum(['masculino', 'femenino', 'otro'], "Género no válido"),
    returnSecureToken: z.boolean().optional(),
})

export type SignUpInput = z.infer<typeof signUpSchema>;

export interface userSignUpResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}