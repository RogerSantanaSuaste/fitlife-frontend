import axios from "axios";
import { signUpSchema, SignUpInput, userSignUpResponse } from "@/models/userSignUp";
import 'dotenv/config';

const AUTH_PORT = process.env.AUTH_PORT || '3006';
const BASE_URL = `http://localhost:${AUTH_PORT}/api/auth/register`;

export const registerUser = async (userData: SignUpInput): Promise<userSignUpResponse> => {
    /* Example of userData
    {
      "email": "email@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe",
      "gender": "masculino",
      "returnSecureToken": true
    }
    */
    try {
        // Validate input data
        signUpSchema.parse(userData);
        // Make the API request
        const response = await axios.post<userSignUpResponse>(BASE_URL, userData);
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