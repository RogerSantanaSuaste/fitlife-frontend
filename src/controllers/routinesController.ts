import { getRoutineService, getRoutineById } from "@/services/routineService";
import { Routine, routineSchema } from "@/models/routines";
import { get } from "http";

export const routinesController = {
    async getRecommendedRoutines(userId: string): Promise<Routine[]> {
        try {
            const routines = await getRoutineService(userId);
            return routines;
        } catch (error: any) {
            console.error("Error fetching recommended routines:", error.message);
            throw new Error("Error fetching recommended routines");
        }
    },
    
    async getRoutineDetails(routineId: string): Promise<Routine> {
        try {
            const routine = await getRoutineById(routineId);
            routineSchema.parse(routine); // Validate the routine data
            return routine;
        } catch (error: any) {
            console.error("Error fetching routine details:", error.message);
            throw new Error("Error fetching routine details");
        }
    }
}