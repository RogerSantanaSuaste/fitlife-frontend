import { z } from "zod";

export const exerciseSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string(),
    contraindicaciones: z.array(z.string()),
    nivel: z.enum(["BAJO", "INTERMEDIO", "AVANZADO"]),
    series_recomendadas: z.number().min(1, "Debe haber al menos 1 serie recomendada"),
    repeticiones_recomendadas: z.number().min(1, "Debe haber al menos 1 repetición recomendada"),
    gifUrl: z.string(), // TODO: .url("Debe ser una URL válida") cuando se tengan URLs reales
    musculo_principal: z.string(),
    musculo_secundario: z.string(),
    instrucciones: z.array(z.string()),
})

export type Exercise = z.infer<typeof exerciseSchema>;