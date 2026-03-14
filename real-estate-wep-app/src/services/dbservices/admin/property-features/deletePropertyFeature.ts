import { API_BASE_URL } from "../../../../repo/datarepo";

export const deletePropertyFeatureAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/estatepropertyprops/delete-estate-property-prop?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete property feature");
        }

        return true;
    } catch (error) {
        console.error("Error deleting property feature:", error);
        return false;
    }
};
