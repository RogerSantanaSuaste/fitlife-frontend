import axios from "axios";
import { healthInfo, healthInfoSchema, userHealthResponse } from "@/models/userHealth";
import 'dotenv/config';

const HEALTH_PORT = process.env.AUTH_PORT || '3006';
const BASE_URL = `http://localhost:${HEALTH_PORT}/api/health/user/`; // + userId

export const sendHealthInfo = async (userId: string, healthData: healthInfo, idToken: string): Promise<userHealthResponse> => {
    try {
        // Validate input data
        healthInfoSchema.parse(healthData);
        // Make the API request
        const response = await axios.post<userHealthResponse>(
            `${BASE_URL}${userId}`,
            healthData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
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