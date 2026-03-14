import { API_BASE_URL } from "../../../../repo/datarepo";

export const saveSettingsAction = async (id: number, value: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings/update-settings?settings_id=${encodeURIComponent(id)}&settings_value=${encodeURIComponent(value)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to save settings");
        }

        return true;
    } catch (error) {
        console.error("Error saving settings:", error);
        return false;
    }
};
