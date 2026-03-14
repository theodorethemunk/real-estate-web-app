import { API_BASE_URL } from "../../../../../repo/datarepo";

export const deleteCareerApplicationAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/careerapplication/delete-career-application?application_id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete career application");
        }

        return true;
    } catch (error) {
        console.error("Error deleting career application:", error);
        return false;
    }
};
