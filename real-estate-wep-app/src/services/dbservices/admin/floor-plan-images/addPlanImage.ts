import { IPlanImage } from "../../../../models/interfaces/IPlanImage";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const UploadFloorPlan = async (imageToken: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("imageToken", imageToken);
    formData.append("file", image);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/planimage/upload-floor-plan-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Floor plan uploaded successfully:", result.imageUrl);

  } catch (error) {
    console.error("Failed to upload floor plan:", error);
  }
};

export const SavePlanImageAction = async (data: IPlanImage) => 
{
    console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/planimage/save-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    return "success";

  } catch (error) {
    return "Failed to save floor plan";
  }
};
