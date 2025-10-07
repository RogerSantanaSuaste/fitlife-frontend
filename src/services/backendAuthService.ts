import { backendAuthRegisterBasic, backendAuthRegisterBasicResponse, backendAuthRegisterBasicResponseSchema, backendAuthRegisterBasicSchema, getProfileResponse } from "@/models/backendAuth";
import axios from "axios";
require('dotenv').config();

const AUTH_PORT = process.env.AUTH_PORT || '3006';
const BASE_URL = `http://localhost:${AUTH_PORT}/api/auth/register-basic`;

export const registerBasicAuthService = async (userData: backendAuthRegisterBasic, idToken: string): Promise<backendAuthRegisterBasicResponse> => {
    /* Example of userData
    {
    "firstName": "Felipe",
    "lastName": "Usuario",
    "gender": "masculino"
    }
    */
   try {
        // Validate input data
        backendAuthRegisterBasicSchema.parse(userData);
        // Make the API request
        const response = await axios.post<backendAuthRegisterBasicResponse>(
            BASE_URL,
            userData,
            {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            }
        );
        // Validate response data
        backendAuthRegisterBasicResponseSchema.parse(response.data);
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

export const getProfile = async (idToken: string): Promise<getProfileResponse> => {
    const PROFILE_URL = `http://localhost:${AUTH_PORT}/api/auth/profile`;
    try {
        const response = await axios.get<getProfileResponse>(PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
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
