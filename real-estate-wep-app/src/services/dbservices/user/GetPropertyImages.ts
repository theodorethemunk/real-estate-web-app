import { API_BASE_URL } from "../../../repo/datarepo";
import { IImage } from "../../../models/interfaces/IImage";

export const getPropertyImagesAction = async (property_id: number): Promise<IImage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/estatepropertyimages/get-all-property-images?property_id=${property_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };
