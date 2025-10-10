import axios from "axios";
import { Routine, routineSchema } from "@/models/routines";
import 'dotenv/config';

const ROUTINE_PORT = process.env.ROUTINES_PORT || 3001;

export const getRoutineService = async (userId: string): Promise<Routine[]> => {
    const BASE_URL = `http://localhost:${ROUTINE_PORT}/api/cuidador/rutinas-aptas?userId=`;
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

