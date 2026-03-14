import { IExternalProp } from "../../../../models/interfaces/IExternalProp";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const fetchExternalProperties = async (keyword: string = "", limit: number = 500): Promise<IExternalProp[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/externalproperties/fetch-properties`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch external properties");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching external properties:", error);
      return [];
    }
};
