// src/controllers/registrationController.ts
import { registerUser } from "@/services/registrationService";
import { SignUpInput, userSignUpResponse } from "@/models/userRegister";
import { registerBasicAuthService } from "@/services/backendAuthService";

export const registrationController = {
  async signUp(userData: SignUpInput, terms: boolean): Promise<userSignUpResponse> {
    if (!terms) {
      throw new Error("Debe aceptar los términos y condiciones");
    }
    try {
      // Call the service (this already validates the data)
      const response = await registerUser(userData);

      // You get Firebase tokens here
      const { idToken, refreshToken, localId, email, expiresIn } = response;

      // Once the Firebase token is returned, it is needed to contact the AuthBackend to register the user in the local database of the backend.
    const basicInfo = await registerBasicAuthService(
        {
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender
        },
        idToken
    )
      // Store session token (frontend side only — not secure for production)
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          token: idToken,
          refreshToken,
          userId: basicInfo.id,
          email,
          profileCompleted: basicInfo.profileCompleted,
          expiresAt: Date.now() + Number(expiresIn) * 1000,
        })
      );

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
