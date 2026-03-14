import { API_BASE_URL } from "../../../../repo/datarepo";

export const setMainPropertyImageAction = async (image_id: number, image_path: string, property_id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/estateproperty/set-main-property-image?image_id=${encodeURIComponent(image_id)}&image_path=${encodeURIComponent(image_path)}&property_id=${encodeURIComponent(property_id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to change main property image");
        }

        return true;
    } catch (error) {
        console.error("Error changing main property image:", error);
        return false;
    }
};
