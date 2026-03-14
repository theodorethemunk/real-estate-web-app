import { API_BASE_URL } from "../../../../../repo/datarepo";

export const rejectCareerApplicationAction = async (id: number): Promise<boolean> => {
    try
    {
        const response = await fetch(`${API_BASE_URL}/careerapplication/reject-career-application?career_id=${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to reject career application");
        }

        return true;
    } 
    catch (error)
    {
        console.error("Error: Failed to reject career application.", error);
        return false;
    }
};
