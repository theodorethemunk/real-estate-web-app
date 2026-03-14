import { API_BASE_URL } from "../../../../repo/datarepo";

export const activateUserAction = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/activate-user?user_id=${encodeURIComponent(userId)}`, {
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
