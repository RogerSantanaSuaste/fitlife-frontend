import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email("Dirección de correo electrónico no válida"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
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