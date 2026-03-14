import { API_BASE_URL } from "../../../../repo/datarepo";

export const deleteTicketAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/ticket/delete-ticket?ticket_id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete ticket");
        }

        return true;
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return false;
    }
};
