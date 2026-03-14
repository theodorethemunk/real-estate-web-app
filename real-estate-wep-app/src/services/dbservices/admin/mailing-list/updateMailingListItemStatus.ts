import { API_BASE_URL } from "../../../../repo/datarepo";

export const updateMailingListItemStatus = async (id: number, status: string): Promise<boolean> => {
    try
    {
        const response = await fetch(`${API_BASE_URL}/mailinglist/update-mailing-list-item-status?id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to update mailing list item status");
        }

        return true;
    } 
    catch (error)
    {
        console.error("Error: Failed to update mailing list item status.", error);
        return false;
    }
};
