import { assignRoutineToUserService, getAssignedRoutinesService, getRoutinesByUserIdFromRoutinePortService, unassignRoutineService, createRoutineService } from "@/services/managerService";
import { PostAsssignRoutineResponse, AssignedRoutinesResponse, PostCreateRoutine } from "@/models/routineManager";
import { Routine } from "@/models/routines";

export const routineManagerController = {
    async assignRoutineToUser(userId: string, routineId: string): Promise<PostAsssignRoutineResponse> {
        try {
            return await assignRoutineToUserService(userId, routineId);
        } catch (error: any) {
            throw new Error(`Error assigning routine to user: ${error.message}`);
        }
    },

    async getAssignedRoutines(userId: string): Promise<Routine[]> {
        // Uses two services, since there is a little of a mismatch in the databse schemas.
        try {
            const assignedRoutinesFromManagerPort: AssignedRoutinesResponse[] = await getAssignedRoutinesService(userId);
            const routinesFromRoutinesPort: Routine[] = await getRoutinesByUserIdFromRoutinePortService(userId);
            // Map the assigned routines since they include the routine inside routineDetails
            const mappedRoutines: Routine[] = assignedRoutinesFromManagerPort.map(ar => ({
                ...ar.routineDetails
            }))
            // Merge both arrays, avoiding duplicates based on routine ID
            const mergedRoutines: Routine[] = [...mappedRoutines];
            routinesFromRoutinesPort.forEach(routine => {
                if (!mergedRoutines.find(r => r.id === routine.id)) {
                    mergedRoutines.push(routine);
                }
            });
            return mergedRoutines;
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
    },

    async createRoutine(data: PostCreateRoutine) {
        try {
            return await createRoutineService(data);
        } catch (error: any) {
            throw new Error(`Error creating routine: ${error.message}`);
        }
    }
};