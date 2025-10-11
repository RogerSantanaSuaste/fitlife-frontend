import axios from "axios";
import { postAssignRoutineResponseSchema, PostAssignRoutine, PostAsssignRoutineResponse, postAssignRoutineSchema, AssignedRoutinesResponse, AssignedRoutinesResponseSchema } from "@/models/routineManager";
import { PostCreateRoutine, postCreateRoutineSchema } from "@/models/routineManager";
import { Routine } from "@/models/routines";
import 'dotenv/config';

const MANAGER_PORT = process.env.MANAGER_PORT || '3002';
const BASE_URL = `http://localhost:${MANAGER_PORT}/api/manager/`; // + /user/
// +/user/+userId/details
// +/user/+userId/routine/+routineId
// +/asign

export const assignRoutineToUserService = async (userId: string, routineId: string): Promise<PostAsssignRoutineResponse> => {
    try {
        const assignData: PostAssignRoutine = {
            usuario_id: userId,
            rutina_id: routineId,
        };
        // Validate input data
        postAssignRoutineSchema.parse(assignData);
        // Make the API request
        const response = await axios.post<PostAsssignRoutineResponse>(
            `${BASE_URL}assign`,
            assignData,
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.message || error.response.data.error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export const getAssignedRoutinesService = async (userId: string): Promise<AssignedRoutinesResponse[]> => {
    try {
        const response = await axios.get<AssignedRoutinesResponse[]>(`${BASE_URL}user/${userId}/details`)
        // Validate response data
        response.data.forEach(routine => AssignedRoutinesResponseSchema.parse(routine));
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.message || error.response.data.error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export const unassignRoutineService = async (userId: string, routineId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}user/${userId}/routine/${routineId}`);
        if (response.status === 204) {
            return { message: "Rutina desasignada correctamente" };
        } else {
            throw new Error("Error: No se pudo desasignar la rutina");
        }
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.message || error.response.data.error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export const createRoutineService = async (data: PostCreateRoutine): Promise<Routine> => {
    const BASE_URL = `http://localhost:${MANAGER_PORT}/rutinas`
    try {
        // Validate input data
        postCreateRoutineSchema.parse(data);
        // Make the API request
        const response = await axios.post<Routine>(BASE_URL, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.message || error.response.data.error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
}