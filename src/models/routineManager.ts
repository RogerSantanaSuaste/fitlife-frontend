import { z } from "zod";
import { routineSchema } from "./routines";
import { exerciseSchema } from "./exercises";
import { foodSchema } from "./foods";

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

/* Datos para crear una rutina
{
    "usuario_id": "user-123",
    "nombre": "Mi Rutina de Lunes",
    "dias": ["LUNES", "MIERCOLES"],
    "ejercicios": [
        {
            "id": "ejer-001",
            "nombre": "Press de Banca",
            "categoria": "Pecho",
            "contraindicaciones": [],
            "nivel": "INTERMEDIO",
            "series_recomendadas": 4,
            "repeticiones_recomendadas": 10,
            "gifUrl": "https://ejemplo.com/press_banca.gif",
            "musculo_principal": "Pectoral mayor",
            "musculo_secundario": "Tríceps, Deltoides anterior",
            "instrucciones": [],
            "isActive": true
        }
    ],
    "alimentos": [
        {
            "id": "alim-001",
            "nombre": "Pechuga de Pollo",
            "categoria": "Proteína",
            "imagen": "https://ejemplo.com/imagen_pollo.jpg",
            "alergenos": [],
            "calorias": 165,
            "proteinas": 31,
            "isActive": true
        }
    ]
}
*/

export const postCreateRoutineSchema =z.object({
    usuario_id: z.string(),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    dias: z.array(z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"])).min(1, "Debe seleccionar al menos un día"),
    ejercicios: z.array(exerciseSchema).min(1, "Debe agregar al menos un ejercicio"),
    alimentos: z.array(foodSchema).min(1, "Debe agregar al menos un alimento"),
})

export type PostCreateRoutine = z.infer<typeof postCreateRoutineSchema>;