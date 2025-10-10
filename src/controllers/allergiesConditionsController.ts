import { getAllergiesConditions } from "@/services/allergiesConditionsService";

export const allergiesConditionsController = {
    async getAllergiesConditions() { // FETCHES GLOBAL
        try {
            const data = await getAllergiesConditions();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch allergies and conditions: ${error}`);
        }
    }
}