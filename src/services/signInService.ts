import axios from "axios";
import { userSignIn, userSignInResponse, userSignInSchema, UserSignInInput } from "@/models/userSignIn";
require('dotenv').config();

const API_KEY = process.env.FIREBASE_WEB_API_KEY;
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export const signInUser = async (userData: UserSignInInput): Promise<userSignInResponse> => {
    /* Example of userData
    {
      "email": "email@example.com",
        "password": "password123",
        "returnSecureToken": true
    }
    */
    try {
        // Validate input data
        userSignInSchema.parse(userData);
        // Make the API request
        const response = await axios.post<userSignInResponse>(BASE_URL, userData);
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