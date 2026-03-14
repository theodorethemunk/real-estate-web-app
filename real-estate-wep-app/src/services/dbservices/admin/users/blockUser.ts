import { API_BASE_URL } from "../../../../repo/datarepo";

export const blockUserAction = async (userId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/userprofile/block-user?user_id=${encodeURIComponent(userId)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to block user");
        }

        return true;
    } catch (error) {
        console.error("Error blocking user:", error);
        return false;
    }
};
