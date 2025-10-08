import { z } from "zod";

export const foodSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string(),
    imagen: z.string().optional(), // TODO .url("Debe ser una URL válida") cuando se tengan URLs reales
    alergenos: z.array(z.string()),
    calorias: z.number().min(0, "Las calorías no pueden ser negativas"),
    proteinas: z.number().optional(),
    isActive: z.boolean().optional(),
})

export type Food = z.infer<typeof foodSchema>;

export interface FoodResponse {
    alimentos: Food[];
}