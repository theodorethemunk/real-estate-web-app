import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const deletePropertyAction = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/estateproperty/delete-estate-property/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete property");
        }

        Swal.fire({
              icon: "success",
              title: "Congratulations!",
              text: "Property deleted successfully.",
            });

        return true;
    } catch (error) {
        console.error("Error deleting property:", error);
        return false;
    }
};
