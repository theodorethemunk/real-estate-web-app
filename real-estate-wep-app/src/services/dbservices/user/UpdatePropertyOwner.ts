import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../repo/datarepo";

export const UpdatePropertyOwnerAction = async (
  owner_id: number,
  property_id: number,
  refcode: string
): Promise<string> => {
  try {
    const requestData = {
      owner_id,
      property_id,
      refcode
    };

    const response = await fetch(
      `${API_BASE_URL}/estateproperty/update-estate-property-ownership`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.text();
    if (!response.ok) {
      throw new Error(result);
    }

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Your transaction for acquiring this property was successful. All necessary documents will be forwarded to your email shortly.",
    });

    return "success";
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Transaction Failed",
      text: error.message || "An error occurred while updating the property owner.",
    });

    return "Failed to save changes";
  }
};
