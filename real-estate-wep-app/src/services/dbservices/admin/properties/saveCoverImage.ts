import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const SavePropertyCoverImageAction = async (
  property_id: number,
  image_path: string,
  image_token: string,
  image: File
) => {
  const formData = new FormData();
  formData.append("property_id", property_id.toString());
  formData.append("image_path", image_path);
  formData.append("image_token", image_token);
  formData.append("image", image); // Must match what the controller expects

  console.log("image_path: "+image_path);
  console.log("image_token: "+image_token);
  console.log("property_id: "+property_id);

  try {
    const response = await fetch(`${API_BASE_URL}/estateproperty/save-cover-image`, {
      method: "POST",
      body: formData, // No need to set Content-Type, fetch sets it with boundary
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "Property cover image updated successfully.",
        });

    return "success";
  } catch (error) {
    console.error("Error saving cover image:", error);
    return "Failed to save cover image";
  }
};
