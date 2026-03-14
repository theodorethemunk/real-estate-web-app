import { IImage } from "../../../models/interfaces/IImage";
import { API_BASE_URL } from "../../../repo/datarepo";



const fetchImages = async (): Promise<IImage[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/images/fetch-images`);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
};

export {fetchImages};
