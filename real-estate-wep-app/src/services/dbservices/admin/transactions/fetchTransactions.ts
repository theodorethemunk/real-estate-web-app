import { API_BASE_URL } from "../../../../repo/datarepo";
import { ITransactions } from "../../../../models/interfaces/TransactionInterface";

const API_URL = `${API_BASE_URL}/usertransactions/fetch-transactions`;

const fetchTransactions = async (keyword: string = "", limit: number = 500): Promise<ITransactions[]> => {
    try {
      const url = new URL(API_URL);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
};

export {fetchTransactions};
