import { API_BASE_URL } from "../../../../repo/datarepo";

export const deletePropertyImageAction = async (image_id: number, property_id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/estatepropertyimages/delete-property-image?image_id=${encodeURIComponent(image_id)}&property_id=${encodeURIComponent(property_id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete property image");
        }

        return true;
    } catch (error) {
        console.error("Error deleting property image:", error);
        return false;
    }
};
