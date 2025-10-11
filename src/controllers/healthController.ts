import { sendHealthInfo, getRecommendedFoodsAndExercises } from "@/services/healthService";
import { HealthInfo, userHealthResponse } from "@/models/userHealth";
import { RecommendedFoodsAndExercises } from "@/models/userHealth";

export const healthController = {
    sendHealthInfo: async (userId: string, healthData: HealthInfo): Promise<userHealthResponse> => {
        return sendHealthInfo(userId, healthData);
    },
    getRecommendedFoodsAndExercises: async (userId: string): Promise<RecommendedFoodsAndExercises> => {
        return getRecommendedFoodsAndExercises(userId);
    },
};