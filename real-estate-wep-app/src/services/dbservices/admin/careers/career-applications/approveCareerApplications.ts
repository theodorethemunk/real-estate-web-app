import { API_BASE_URL } from "../../../../../repo/datarepo";

export const approveCareerApplicationAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/careerapplication/approve-career-application?career_id=${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to approve career application");
        }

        return true;
    } catch (error) {
        console.error("Error: Failed to approve career application.", error);
        return false;
    }
};
