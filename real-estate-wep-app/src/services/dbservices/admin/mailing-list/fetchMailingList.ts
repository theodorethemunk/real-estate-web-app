import { API_BASE_URL } from "../../../../repo/datarepo";
import { IMailingList } from "../../../../models/interfaces/IMailingList";

export const fetchMailingListAction = async (keyword: string = "", limit: number = 1000): Promise<IMailingList[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/mailinglist/fetch-mailing-list`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch mailing list");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching mailing list:", error);
      return [];
    }
};
