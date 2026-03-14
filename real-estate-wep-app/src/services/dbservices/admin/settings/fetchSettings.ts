import { ISettings } from "../../../../models/interfaces/ISettings";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const fetchSettings = async (): Promise<ISettings[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/settings/fetch-settings`);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching settings:", error);
      return [];
    }
};
