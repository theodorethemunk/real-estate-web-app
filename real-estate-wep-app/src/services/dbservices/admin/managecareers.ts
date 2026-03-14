import { ICareerApplication } from "../../../models/interfaces/ICareerApplication";
import { API_BASE_URL } from "../../../repo/datarepo";

const API_URL = `${API_BASE_URL}/careerapplication/fetch-career-applications`;

const fetchCareers = async (keyword: string = ""): Promise<ICareerApplication[]> => {
    try {
      const url = new URL(API_URL);
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

export {fetchCareers};
