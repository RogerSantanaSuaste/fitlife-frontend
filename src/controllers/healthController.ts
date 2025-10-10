import { sendHealthInfo } from "@/services/healthService";
import { HealthInfo, userHealthResponse } from "@/models/userHealth";

export const healthController = {
    sendHealthInfo: async (userId: string, healthData: HealthInfo): Promise<userHealthResponse> => {
        return sendHealthInfo(userId, healthData);
    },
};