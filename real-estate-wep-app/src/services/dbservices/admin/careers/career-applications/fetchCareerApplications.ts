import { ICareerApplication } from "../../../../../models/interfaces/ICareerApplication";
import { API_BASE_URL } from "../../../../../repo/datarepo";

export const fetchCareerApplications = async (keyword: string = "", limit: number = 500): Promise<ICareerApplication[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/careerapplication/fetch-career-applications`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch career applications");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching career applications:", error);
      return [];
    }
};
