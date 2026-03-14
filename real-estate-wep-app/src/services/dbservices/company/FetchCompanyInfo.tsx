import { API_BASE_URL } from "../../../repo/datarepo";

export interface Setting {
  id: number;
  name: string;
  context: string;
}

export const fetchCompanyInfo = async (): Promise<Setting[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings/fetch-settings`);
    console.log("✅ Company Info Fetched:", response);
    if (!response.ok) throw new Error("Failed to fetch settings");

    const settings: Setting[] = await response.json();
    console.log("✅ Company Info Fetched:", settings);
    return settings;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return [];
  }
};
