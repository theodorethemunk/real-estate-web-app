import { API_BASE_URL } from "../../../../repo/datarepo";


export const deleteExternalPropertyAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/externalproperties/delete-property/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete property");
        }

        return true;
    } catch (error) {
        console.error("Error deleting property:", error);
        return false;
    }
};
