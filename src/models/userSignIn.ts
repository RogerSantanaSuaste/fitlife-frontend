import { z } from "zod";

export interface userSignIn {
    email: string;
    password: string;
}

export interface userSignInResponse {
    kind: string;
    localid: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
}

export const userSignInSchema = z.object({
    email: z.string().email("Dirección de correo electrónico no válida"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const userSignInResponseSchema = z.object({
    kind: z.string(),
    localid: z.string(),
    email: z.string().email(),
    displayName: z.string().optional(),
    idToken: z.string(),
    registered: z.boolean(),
    refreshToken: z.string(),
    expiresIn: z.string().transform(val => Number(val)),
});

export type UserSignInInput = z.infer<typeof userSignInSchema>;
