import { API_BASE_URL } from "../../../../repo/datarepo";

export const updateTicketStatusAction = async (id: number, status: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/ticket/update-ticket-status?ticket_id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to update ticket status");
        }

        return true;
    } catch (error) {
        console.error("Error updating ticket status:", error);
        return false;
    }
};
