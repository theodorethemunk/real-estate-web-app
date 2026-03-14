import { IUserProfile } from "../../../../models/interfaces/IUserProfile";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const fetchUsers = async (keyword: string = "", limit: number = 500): Promise<IUserProfile[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/userprofile/fetch-users`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);        
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
};
