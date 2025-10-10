import { getRoutineService } from "@/services/routineService";
import { Routine, routineSchema } from "@/models/routines";

export const routinesController = {
    async getRecommendedRoutines(userId: string): Promise<Routine[]> {
        try {
            const routines = await getRoutineService(userId);
            return routines;
        } catch (error: any) {
            console.error("Error fetching recommended routines:", error.message);
            throw new Error("Error fetching recommended routines");
        }
    }
}