import { API_BASE_URL } from "../../../../repo/datarepo";

export const reomoveFromMailingListAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/mailinglist/delete?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to remove user from mailing list");
        }

        return true;
    } catch (error) {
        console.error("Error removing user from mailing list:", error);
        return false;
    }
};
