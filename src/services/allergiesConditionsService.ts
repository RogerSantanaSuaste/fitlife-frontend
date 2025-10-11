import { Allergy, allergySchema } from "@/models/allergies";
import { Conditions, conditionSchema } from "@/models/conditions";
import { allergiesConditionsResponseSchema, allergiesConditionsResponse } from "@/models/allergiesConditions";
import axios from "axios";

const AUTH_PORT = process.env.AUTH_PORT || '3006'; // AUTH has Health service too
const BASE_URL = `http://localhost:${AUTH_PORT}/api/health/options`;

export const getAllergiesConditions = async (): Promise<allergiesConditionsResponse> => {
    try {
        const response = await axios.get<allergiesConditionsResponse>(BASE_URL);
        // Validate response data
        return allergiesConditionsResponseSchema.parse(response.data);
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