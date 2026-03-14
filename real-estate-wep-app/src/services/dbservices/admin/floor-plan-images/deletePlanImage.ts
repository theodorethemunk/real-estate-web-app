import { API_BASE_URL } from "../../../../repo/datarepo";

export const deletePlanImageAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/planimage/delete-image?image_id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete floor plan image");
        }

        return true;
    } catch (error) {
        console.error("Error deleting floor plan image:", error);
        return false;
    }
};
