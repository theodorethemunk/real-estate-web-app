import { API_BASE_URL } from "../../../../repo/datarepo";

export const activateUser = async (userId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/userprofile/activate-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error("Failed to activate user");
        }

        return true;
    } catch (error) {
        console.error("Error activating user:", error);
        return false;
    }
};
