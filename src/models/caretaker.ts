import { Exercise, exerciseSchema } from "./exercises";
import { Food, foodSchema } from "./foods";
import { z } from "zod";

export interface CaretakerResponse {
    ejercicios: Exercise[];
    alimentos: Food[];
}

export const caretakerResponseSchema = z.object({
    ejercicios: z.array(exerciseSchema),
    alimentos: z.array(foodSchema),
});