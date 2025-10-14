import axios from "axios";
import { Routine, routineSchema } from "@/models/routines";
import 'dotenv/config';

const AUTH_PORT = process.env.AUTH_PORT || 3006;
const ROUTINE_PORT = process.env.ROUTINE_PORT || 3001;

export const getRoutineService = async (userId: string): Promise<Routine[]> => {
    const BASE_URL = `http://localhost:${AUTH_PORT}/api/cuidador/rutinas-aptas?userId=`;
    try {
        const response = await axios.get<Routine[]>(`${BASE_URL}${userId}`);
        // Validate response data
        response.data.forEach(routine => routineSchema.parse(routine));
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

export const getRoutineById = async (routineId: string, userId: string): Promise<Routine> => {
    const BASE_URL = `http://localhost:${ROUTINE_PORT}/rutinas-default/`; // +"defaultId"
    // A second endpoint was needed to fetch "Private" routines by ID
    const PRIVATE_ROUTINE_URL = `http://localhost:${ROUTINE_PORT}/rutinas/${routineId}?usuarioId=${userId}`;
    try {
        // Fetch both endpoints and see which one returns a valid routine
        if (userId) {
            try {
                const privateResponse = await axios.get<Routine>(`${PRIVATE_ROUTINE_URL}`);
                routineSchema.parse(privateResponse.data);
                return privateResponse.data;
            } catch (error) {
                // If it fails, we ignore the error and try the default endpoint
            }
        }
        const response = await axios.get<Routine>(`${BASE_URL}${routineId}`);
        routineSchema.parse(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.message || error.response.data.error?.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
}
