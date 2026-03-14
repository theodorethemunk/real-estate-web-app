import { API_BASE_URL } from "../../../../repo/datarepo";

export const deleteTestimonialAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonial/delete-testimonial?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete testimonial");
        }

        return true;
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return false;
    }
};
