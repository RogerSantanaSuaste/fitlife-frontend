import axios from "axios";
import { LogInSchema, LogInResponseSchema, LogInInput, LogInResponse } from "@/models/userLogin";
import 'dotenv/config';

const AUTH_PORT = process.env.AUTH_PORT || '3006';
const BASE_URL = `http://localhost:${AUTH_PORT}/api/auth/login`;
export const logInUserService = async (userData: LogInInput): Promise<LogInResponse> => {
    /* Example of userData
    {
      "email": "email@example.com",
        "password": "password123",
        "returnSecureToken": true
    }
    */
    try {
        // Validate input data
        LogInSchema.parse(userData);
        // Make the API request
        const response = await axios.post<LogInResponse>(BASE_URL, userData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.data.error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Error: No response from server");
        } else {
            // Something else happened
            throw new Error(`Error: ${error.message}`);
        }
    }
};