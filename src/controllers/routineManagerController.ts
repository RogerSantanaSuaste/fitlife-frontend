import { assignRoutineToUserService, getAssignedRoutinesService, unassignRoutineService } from "@/services/managerService";
import { PostAsssignRoutineResponse, AssignedRoutinesResponse } from "@/models/routineManager";

export const routineManagerController = {
    async assignRoutineToUser(userId: string, routineId: string): Promise<PostAsssignRoutineResponse> {
        try {
            return await assignRoutineToUserService(userId, routineId);
        } catch (error: any) {
            throw new Error(`Error assigning routine to user: ${error.message}`);
        }
    },

    async getAssignedRoutines(userId: string): Promise<AssignedRoutinesResponse[]> {
        try {
            return await getAssignedRoutinesService(userId);
        } catch (error: any) {
            throw new Error(`Error getting assigned routines: ${error.message}`);
        }
    },

    async unassignRoutine(userId: string, routineId: string) {
        try {
            return await unassignRoutineService(userId, routineId);
        } catch (error: any) {
            throw new Error(`Error unassigning routine: ${error.message}`);
        }
    }
};