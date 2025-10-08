import { z } from "zod";

export interface Exercise {
    id: string;
    nombre: string;
    categoria: string;
    contradicciones: string[];
    nivel_minimo: string | "BAJO" | "INTERMEDIO" | "AVANZADO";
    series_recomendadas: number;
    repeticiones_recomendadas: number;
    gifUrl: string;
    musculo_principal: string;
    musculo_secundario: string;
    instrucciones: string[];
}

export const exerciseSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string(),
    contradicciones: z.array(z.string()),
    nivel_minimo: z.enum(["BAJO", "INTERMEDIO", "AVANZADO"]),
    series_recomendadas: z.number().min(1, "Debe haber al menos 1 serie recomendada"),
    repeticiones_recomendadas: z.number().min(1, "Debe haber al menos 1 repetición recomendada"),
    gifUrl: z.string(), // TODO: .url("Debe ser una URL válida") cuando se tengan URLs reales
    musculo_principal: z.string(),
    musculo_secundario: z.string(),
    instrucciones: z.array(z.string()),
})