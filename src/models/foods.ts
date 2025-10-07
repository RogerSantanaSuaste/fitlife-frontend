import { z } from "zod";

export const foodSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string(),
    alergenos: z.array(z.string()),
    imagen: z.string(), // TODO .url("Debe ser una URL válida") cuando se tengan URLs reales
    calorias_por_100g: z.number().min(0, "Las calorías no pueden ser negativas"),
    proteinas: z.number().optional(),
})

export type Food = z.infer<typeof foodSchema>;

export interface FoodResponse {
    alimentos: Food[];
}