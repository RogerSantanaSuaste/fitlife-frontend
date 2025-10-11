import { z } from "zod";

export interface backendAuthRegisterBasic {
    firstName: string;
    lastName: string;
    gender: 'masculino' | 'femenino' | 'otro';
}

export interface backendAuthRegisterBasicResponse {
    id: string;
    profileCompleted: boolean;
}

export const backendAuthRegisterBasicSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    gender: z.enum(['masculino', 'femenino', 'otro'], "Género no válido")
});

export const backendAuthRegisterBasicResponseSchema = z.object({
    id: z.string(),
    profileCompleted: z.boolean(),
});

export interface getProfileResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'masculino' | 'femenino' | 'otro';
    profileCompleted: boolean;
}