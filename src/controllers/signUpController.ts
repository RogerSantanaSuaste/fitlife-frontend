// src/controllers/registrationController.ts
import { registerUser } from "@/services/signUpService";
import { SignUpInput, userSignUpResponse } from "@/models/userSignUp";
export const registrationController = {
  async signUp(userData: SignUpInput, terms: boolean): Promise<userSignUpResponse> {
    if (!terms) {
      throw new Error("Debe aceptar los términos y condiciones");
    }
    try {
      // Call the service (this already validates the data)
      const response = await registerUser(userData);
      const { idToken, refreshToken, expiresIn, localId, email, userId, profile_completed, firstName, lastName, gender } = response;
      // Store session token in a jwt cookie or local storage
      if (typeof window !== "undefined") {
        const expiresAt = Date.now() + Number(expiresIn) * 1000; // Convert expiresIn to milliseconds
        const sessionData = {
          idToken, refreshToken, expiresAt, localId, email, userId, profile_completed, firstName
          , lastName, gender
        };
        localStorage.setItem("userSession", JSON.stringify(sessionData));
      }

      return response;
    } catch (error: any) {
      console.error("Error in registrationController:", error.message);
      throw error;
    }
  },

  getSession() {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem("userSession");
    if (!session) return null;

    const parsed = JSON.parse(session);
    if (Date.now() > parsed.expiresAt) {
      // Token expired
      localStorage.removeItem("userSession");
      return null;
    }

    return parsed;
  },

  clearSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("userSession");
  },
};
