import { logInUserService } from "@/services/logInService";
import { LogInSchema, LogInResponseSchema, LogInInput, LogInResponse } from "@/models/userLogin";
export const LogInController = {
    async LogIn(userData: LogInInput): Promise<LogInResponse> {
        try {
            // Call the service (this already validates the data)
            const response = await logInUserService(userData);
            const { idToken, refreshToken, expiresIn, localId, email, userId, profile_completed, firstName, lastName, gender } = response;
            // Store session token in a jwt cookie or local storage
            if (typeof window !== "undefined") {
                const expiresAt = Date.now() + Number(expiresIn) * 1000; // Convert expiresIn to milliseconds
                const sessionData = {
                    idToken, refreshToken, expiresAt, localId, email, userId, profile_completed, firstName, lastName, gender
                };
                // Store the session data (you can use localStorage, sessionStorage, or cookies)
                localStorage.setItem("userSession", JSON.stringify(sessionData));
            }
            return response;
        } catch (error: any) {
            // Handle errors (e.g., validation errors, service errors)
            console.error("Error in LogInController:", error.message);
            throw new Error(`LogIn failed: ${error.message}`); 
        }
    }
}