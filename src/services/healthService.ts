import axios from "axios";
import { HealthInfo, healthInfoSchema, RecommendedFoodsAndExercises, userHealthResponse } from "@/models/userHealth";
import { Food } from "@/models/foods";
import { Exercise } from "@/models/exercises";
import 'dotenv/config';

const HEALTH_PORT = process.env.AUTH_PORT || '3006';
const BASE_URL = `http://localhost:${HEALTH_PORT}/api/health/public/user/`; // + userId

export const sendHealthInfo = async (userId: string, healthData: HealthInfo): Promise<userHealthResponse> => {
    try {
        // Validate input data
        healthInfoSchema.parse(healthData);
        // Make the API request
        const response = await axios.post<userHealthResponse>(
            `${BASE_URL}${userId}`,
            healthData,
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

// {{baseUrl}}/api/cuidador/aptos?userId={{userId}}

export const getRecommendedFoodsAndExercises = async (userId: string): Promise<RecommendedFoodsAndExercises> => {
    const BASE_URL = `http://localhost:${HEALTH_PORT}/api/cuidador/aptos?userId=${userId}`;
    try {
        const response = await axios.get<RecommendedFoodsAndExercises>(BASE_URL);
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