import { API_BASE_URL } from "../../../../repo/datarepo";

export const deleteFAQAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/faq/delete-faq?faq_id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete faq");
        }

        return true;
    } catch (error) {
        console.error("Error deleting faq:", error);
        return false;
    }
};
